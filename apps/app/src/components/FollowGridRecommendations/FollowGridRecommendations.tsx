import type { FC } from "react";
import { useCallback } from "react";

import { FollowCard } from "@lightdotso/app/components/FollowCard";
import { FollowGridBase } from "@lightdotso/app/components/FollowGridBase";
import { FOLLOW_GRID_NUMBER } from "@lightdotso/app/config/Query";
import { useCyberConnectRecommendations } from "@lightdotso/app/hooks/useCyberConnectRecommendations";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

type FollowGridRecommendationsProps = {
  address?: string;
};

export const FollowGridRecommendations: FC<FollowGridRecommendationsProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const {
    recommendations: recommendationsPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectRecommendations(profileAddress, FOLLOW_GRID_NUMBER);

  const recommendations = recommendationsPage
    ? [].concat(...recommendationsPage)
    : [];

  const onClick = useCallback(() => {
    return setSize(size + 1);
  }, [setSize, size]);

  return (
    <FollowGridBase
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      onClick={onClick}
    >
      {recommendations &&
        typeof recommendations[0] !== "undefined" &&
        recommendations?.map((card, id) => {
          return (
            <FollowCard
              key={id}
              id={id.toString()}
              address={card.address}
              recommendationReason={card.recommendationReason}
            />
          );
        })}
    </FollowGridBase>
  );
};
