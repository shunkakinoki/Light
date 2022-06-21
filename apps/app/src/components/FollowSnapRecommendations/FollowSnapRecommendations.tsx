import type { FC } from "react";
import { useMemo, useCallback } from "react";

import { FollowCard } from "@lightdotso/app/components/FollowCard";
import { FollowSnapBase } from "@lightdotso/app/components/FollowSnapBase";
import { DEAD_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import {
  MAX_FOLLOW_SNAP_NUMBER,
  FOLLOW_RECOMMENDATIONS_NUMBER,
} from "@lightdotso/app/config/Query";
import { useCyberConnectRecommendations } from "@lightdotso/app/hooks/useCyberConnectRecommendations";
import { useIsMobile } from "@lightdotso/app/hooks/useIsMobile";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const FollowSnapRecommendations: FC = () => {
  const { address } = useWallet();
  const {
    recommendations: recommendationPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectRecommendations(
    address || DEAD_WALLET_ADDRESS,
    FOLLOW_RECOMMENDATIONS_NUMBER,
  );

  const isMobile = useIsMobile();
  const card = useMemo(() => {
    if (isMobile) {
      return recommendationPage ? [].concat(...recommendationPage) : [];
    }
    return recommendationPage && size ? recommendationPage[size - 1] : [];
  }, [recommendationPage, size, isMobile]);

  const onClick = useCallback(() => {
    if (size >= MAX_FOLLOW_SNAP_NUMBER) {
      return;
    }
    return setSize(size + 1);
  }, [setSize, size]);

  const onBackClick = useCallback(() => {
    if (size <= 1) {
      return;
    }
    return setSize(size - 1);
  }, [setSize, size]);

  return (
    <FollowSnapBase
      title="Recommended people to follow"
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      number={FOLLOW_RECOMMENDATIONS_NUMBER}
      size={size}
      onClick={onClick}
      onBackClick={onBackClick}
    >
      {card &&
        typeof card[0] !== "undefined" &&
        card.map((card, id) => {
          return (
            <FollowCard
              key={id}
              id={id.toString()}
              address={card.address}
              recommendationReason={card.recommendationReason}
            />
          );
        })}
    </FollowSnapBase>
  );
};
