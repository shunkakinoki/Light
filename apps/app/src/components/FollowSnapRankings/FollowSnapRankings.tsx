import type { FC } from "react";
import { useMemo, useCallback, useState, useEffect } from "react";

import { FollowCard } from "@lightdotso/app/components/FollowCard";
import { FollowSnapBase } from "@lightdotso/app/components/FollowSnapBase";
import { KAKI_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import {
  FOLLOW_RANKINGS_NUMBER,
  MAX_FOLLOW_SNAP_NUMBER,
} from "@lightdotso/app/config/Query";
import { useCyberConnectRankings } from "@lightdotso/app/hooks/useCyberConnectRankings";
import { useIsMobile } from "@lightdotso/app/hooks/useIsMobile";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const FollowSnapRankings: FC = () => {
  const { address } = useWallet();
  const [rankingsAddress, setRankingsAddress] = useState(address);
  const {
    rankings: rankingsPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectRankings(rankingsAddress, FOLLOW_RANKINGS_NUMBER);

  const isMobile = useIsMobile();
  const card = useMemo(() => {
    if (isMobile) {
      return rankingsPage ? [].concat(...rankingsPage) : [];
    }
    return rankingsPage && size ? rankingsPage[size - 1] : [];
  }, [rankingsPage, size, isMobile]);

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

  useEffect(() => {
    if (card?.length === 0) {
      setRankingsAddress(KAKI_WALLET_ADDRESS);
    }
  }, [card?.length]);

  return (
    <FollowSnapBase
      title="Top rankings"
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      number={FOLLOW_RANKINGS_NUMBER}
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
              recommendationReason={`#${
                isMobile ? id + 1 : id + 1 + (size - 1) * FOLLOW_RANKINGS_NUMBER
              } on Cyber Connect`}
            />
          );
        })}
    </FollowSnapBase>
  );
};
