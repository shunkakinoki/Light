import type { FC } from "react";

import { ProfileBoardItemEmpty } from "@lightdotso/app/components/ProfileBoardItemEmpty";
import { ProfileBoardItemNFT } from "@lightdotso/app/components/ProfileBoardItemNFT";
import { ProfileBoardSection } from "@lightdotso/app/components/ProfileBoardSection";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";
import { useOpenSeaAssets } from "@lightdotso/app/hooks/useOpenSeaAssets";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

export type ProfileBoardSectionNFTProps = {
  address?: string;
};

export const ProfileBoardSectionNFT: FC<ProfileBoardSectionNFTProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const { assets, isLoading } = useOpenSeaAssets(profileAddress);

  return (
    <ProfileBoardSection
      base={
        <>
          {!assets?.length && <ProfileBoardItemEmpty />}
          {assets &&
            typeof assets[0] !== "undefined" &&
            assets.slice(0, BOARD_SECTION_NUMBER).map((asset, index) => {
              return <ProfileBoardItemNFT key={index} asset={asset} />;
            })}
        </>
      }
      disabled={assets?.length <= 6}
      isLoading={isLoading}
      type="nft"
    >
      {assets &&
        typeof assets[0] !== "undefined" &&
        assets.slice(BOARD_SECTION_NUMBER, -1).map((asset, index) => {
          return <ProfileBoardItemNFT key={index} asset={asset} />;
        })}
    </ProfileBoardSection>
  );
};
