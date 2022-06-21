import type { FC } from "react";
import { useCallback } from "react";

import { FollowListBase } from "@lightdotso/app/components/FollowListBase";
import { FollowListCard } from "@lightdotso/app/components/FollowListCard";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { useCyberConnectFollowings } from "@lightdotso/app/hooks/useCyberConnectFollowings";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

export type FollowListFollowingProps = {
  address?: string;
};

export const FollowListFollowing: FC<FollowListFollowingProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);

  const {
    followings: followingsPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectFollowings(profileAddress, FOLLOW_QUERY_NUMBER);

  const followings = followingsPage ? [].concat(...followingsPage) : [];

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
      {followings &&
        typeof followings[0] !== "undefined" &&
        followings.map((following, id) => {
          return (
            <FollowListCard
              key={id}
              id={id.toString()}
              address={following.address}
              ens={following.domain}
              initialStatus={{
                followStatus: {
                  isFollowing: true,
                },
              }}
            />
          );
        })}
    </FollowListBase>
  );
};
