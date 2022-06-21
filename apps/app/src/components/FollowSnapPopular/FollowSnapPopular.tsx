import type { FC } from "react";
import { useMemo, useCallback, useState, useEffect } from "react";

import { FollowCard } from "@lightdotso/app/components/FollowCard";
import { FollowSnapBase } from "@lightdotso/app/components/FollowSnapBase";
import { KAKI_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import {
  MAX_FOLLOW_SNAP_NUMBER,
  FOLLOW_POPULAR_NUMBER,
} from "@lightdotso/app/config/Query";
import { useCyberConnectPopular } from "@lightdotso/app/hooks/useCyberConnectPopular";
import { useIsMobile } from "@lightdotso/app/hooks/useIsMobile";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const FollowSnapPopular: FC = () => {
  const { address } = useWallet();
  const [popularAddress, setPopularAddress] = useState(address);
  const {
    popular: popularPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useCyberConnectPopular(popularAddress, FOLLOW_POPULAR_NUMBER);

  const isMobile = useIsMobile();
  const card = useMemo(() => {
    if (isMobile) {
      return popularPage ? [].concat(...popularPage) : [];
    }
    return popularPage && size ? popularPage[size - 1] : [];
  }, [popularPage, size, isMobile]);

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
      setPopularAddress(KAKI_WALLET_ADDRESS);
    }
  }, [card?.length]);

  return (
    <FollowSnapBase
      title="Popular people to follow"
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      number={FOLLOW_POPULAR_NUMBER}
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
