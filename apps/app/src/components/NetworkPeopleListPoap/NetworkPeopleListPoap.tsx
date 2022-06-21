import type { FC } from "react";
import { useCallback } from "react";

import { NetworkPeopleListBase } from "@lightdotso/app/components/NetworkPeopleListBase";
import { NetworkPeopleListCard } from "@lightdotso/app/components/NetworkPeopleListCard";
import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { usePoapEventTokens } from "@lightdotso/app/hooks/usePoapEventTokens";
import { useQueueNetworkPoap } from "@lightdotso/app/hooks/useQueueNetworkPoap";

type NetworkPeopleListPoapProps = {
  eventId: string;
};

export const NetworkPeopleListPoap: FC<NetworkPeopleListPoapProps> = ({
  eventId,
}) => {
  const {
    tokens: tokensPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = usePoapEventTokens(eventId, NETWORK_PEOPLE_QUERY_NUMBER);
  useQueueNetworkPoap(eventId);

  const tokens = tokensPage ? [].concat(...tokensPage) : [];

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
      {tokens &&
        typeof tokens[0] !== "undefined" &&
        tokens.map((token, id) => {
          return (
            <NetworkPeopleListCard
              key={id}
              id={id.toString()}
              address={token.owner.id}
            />
          );
        })}
    </NetworkPeopleListBase>
  );
};
