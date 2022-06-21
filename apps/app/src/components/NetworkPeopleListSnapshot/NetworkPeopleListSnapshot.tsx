import type { FC } from "react";
import { useCallback } from "react";

import { NetworkPeopleListBase } from "@lightdotso/app/components/NetworkPeopleListBase";
import { NetworkPeopleListCard } from "@lightdotso/app/components/NetworkPeopleListCard";
import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { useSnapshotVoters } from "@lightdotso/app/hooks/useSnapshotVoters";

type NetworkPeopleListSnapshotProps = {
  spaceId: string;
};

export const NetworkPeopleListSnapshot: FC<NetworkPeopleListSnapshotProps> = ({
  spaceId,
}) => {
  const {
    voters: votersPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useSnapshotVoters(spaceId, NETWORK_PEOPLE_QUERY_NUMBER);

  const voters = votersPage ? [].concat(...votersPage) : [];

  const onClick = useCallback(() => {
    return setSize(size + 1);
  }, [setSize, size]);

  return (
    <NetworkPeopleListBase
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      onClick={onClick}
    >
      {voters &&
        typeof voters[0] !== "undefined" &&
        voters.map((voter, id) => {
          return (
            <NetworkPeopleListCard
              key={id}
              id={id.toString()}
              address={voter?.voter}
            />
          );
        })}
    </NetworkPeopleListBase>
  );
};
