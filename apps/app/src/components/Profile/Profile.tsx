import dynamic from "next/dynamic";
import type { FC } from "react";

import { FollowListFollowers } from "@lightdotso/app/components/FollowListFollowers";
import { FollowListFollowing } from "@lightdotso/app/components/FollowListFollowing";
import type { ProfileBoardSectionNFTProps } from "@lightdotso/app/components/ProfileBoardSectionNFT";
import { ProfileBoardSectionNFT } from "@lightdotso/app/components/ProfileBoardSectionNFT";
import type { ProfileBoardSectionPoapProps } from "@lightdotso/app/components/ProfileBoardSectionPoap";
import { ProfileBoardSectionPoap } from "@lightdotso/app/components/ProfileBoardSectionPoap";
import { ProfileBoardSectionTokens } from "@lightdotso/app/components/ProfileBoardSectionTokens";
import { ProfileFollowHero } from "@lightdotso/app/components/ProfileFollowHero";
import type { ProfileFollowHeroTabsProps } from "@lightdotso/app/components/ProfileFollowHeroTabs";
import { ProfileHero } from "@lightdotso/app/components/ProfileHero";
import type { ProfileHeroTabsProps } from "@lightdotso/app/components/ProfileHeroTabs";
import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { SeoLight } from "@lightdotso/app/components/SeoLight";
import { TimelineListAddress } from "@lightdotso/app/components/TimelineListAddress";
import { useEns } from "@lightdotso/app/hooks/useEns";

export type ProfileProps = ProfileHeroTabsProps &
  ProfileFollowHeroTabsProps &
  ProfileBoardSectionNFTProps &
  ProfileBoardSectionPoapProps;

const ModalNetwork = dynamic(() => {
  return import("@lightdotso/app/components/ModalNetwork").then(mod => {
    return mod.ModalNetwork;
  });
});

const ModalShare = dynamic(() => {
  return import("@lightdotso/app/components/ModalShare").then(mod => {
    return mod.ModalShare;
  });
});

const ModalTwitterVerify = dynamic(() => {
  return import("@lightdotso/app/components/ModalTwitterVerify").then(mod => {
    return mod.ModalTwitterVerify;
  });
});

export const Profile: FC<ProfileProps> = ({ active, follow, address }) => {
  const { ens } = useEns(address);

  return (
    <>
      {!address && <SeoBase base="Profile" />}
      {ens && <SeoLight ogpName={ens ?? address} />}
      <div className="pb-12 lg:pb-16 mx-auto text-center">
        {active && <ProfileHero active={active} address={address} />}
        {follow && <ProfileFollowHero address={address} follow={follow} />}
        {active === "Board" && (
          <div className="py-5 md:py-12 mx-auto space-y-6 lg:max-w-container">
            <ProfileBoardSectionNFT address={address} />
            <ProfileBoardSectionPoap address={address} />
            <ProfileBoardSectionTokens address={address} />
          </div>
        )}
        {active === "Timeline" && <TimelineListAddress address={address} />}
        {follow === "following" && <FollowListFollowing address={address} />}
        {follow === "followers" && <FollowListFollowers address={address} />}
      </div>
      <ModalNetwork />
      <ModalShare />
      <ModalTwitterVerify />
    </>
  );
};
