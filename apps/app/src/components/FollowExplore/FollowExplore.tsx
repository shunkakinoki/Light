import dynamic from "next/dynamic";
import type { FC } from "react";

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

const BannerProfile = dynamic(
  () => {
    return import("@lightdotso/app/components/BannerProfile").then(mod => {
      return mod.BannerProfile;
    });
  },
  { ssr: false },
);

export const FollowExplore: FC = () => {
  const { address } = useWallet();

  return (
    <>
      <SeoBase base="Explore" />
      <FollowContainer address={address}>
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
