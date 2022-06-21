import type { FC } from "react";
import { useCallback } from "react";

import { FollowListBase } from "@lightdotso/app/components/FollowListBase";
import { FollowListCard } from "@lightdotso/app/components/FollowListCard";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { useCyberConnectFollowers } from "@lightdotso/app/hooks/useCyberConnectFollowers";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

type FollowListFollowersProps = {
  address?: string;
};

export const FollowListFollowers: FC<FollowListFollowersProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);

  const {
    followers: followersPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectFollowers(profileAddress, FOLLOW_QUERY_NUMBER);

  const followers = followersPage ? [].concat(...followersPage) : [];

  const onClick = useCallback(() => {
    return setSize(size + 1);
  }, [setSize, size]);

  return (
    <FollowListBase
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      onClick={onClick}
    >
      {followers &&
        typeof followers[0] !== "undefined" &&
        followers.map((follower, id) => {
          return (
            <FollowListCard
              key={id}
              id={id.toString()}
              address={follower.address}
              ens={follower.domain}
            />
          );
        })}
    </FollowListBase>
  );
};
