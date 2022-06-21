import dynamic from "next/dynamic";
import type { FC } from "react";

import { BannerProfile } from "@lightdotso/app/components/BannerProfile";
import { FollowContainer } from "@lightdotso/app/components/FollowContainer";
import { FollowSnapPopular } from "@lightdotso/app/components/FollowSnapPopular";
import { FollowSnapRankings } from "@lightdotso/app/components/FollowSnapRankings";
import { FollowSnapRecommendations } from "@lightdotso/app/components/FollowSnapRecommendations";
import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

const ModalNetwork = dynamic(() => {
  return import("@lightdotso/app/components/ModalNetwork").then(mod => {
    return mod.ModalNetwork;
  });
});

export const FollowExplore: FC = () => {
  const { address } = useWallet();

  return (
    <>
      <SeoBase base="Explore" />
      <FollowContainer small={!!address}>
        {address && <BannerProfile />}
        <FollowSnapPopular />
        <div className="py-8" />
        <FollowSnapRecommendations />
        <div className="py-8" />
        <FollowSnapRankings />
      </FollowContainer>
      <ModalNetwork />
    </>
  );
};
