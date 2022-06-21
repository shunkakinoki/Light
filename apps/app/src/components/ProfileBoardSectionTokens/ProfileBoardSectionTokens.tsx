import type { FC } from "react";

import { ProfileBoardItemToken } from "@lightdotso/app/components/ProfileBoardItemToken";
import { ProfileBoardSection } from "@lightdotso/app/components/ProfileBoardSection";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";
import { useZerionAssets } from "@lightdotso/app/hooks/useZerionAssets";

export type ProfileBoardSectionTokensProps = {
  address?: string;
};

export const ProfileBoardSectionTokens: FC<ProfileBoardSectionTokensProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const { assets, isLoading } = useZerionAssets(profileAddress);

  return (
    <ProfileBoardSection
      base={
        <>
          {/* {!assets?.length && <ProfileBoardItemEmpty />} */}
          {assets &&
            typeof assets[0] !== "undefined" &&
            assets.slice(0, BOARD_SECTION_NUMBER).map((asset, index) => {
              return <ProfileBoardItemToken key={index} asset={asset} />;
            })}
        </>
      }
      disabled={assets?.length <= 6}
      isLoading={isLoading}
      type="token"
    >
      {assets &&
        typeof assets[0] !== "undefined" &&
        assets.slice(BOARD_SECTION_NUMBER, -1).map((asset, index) => {
          return <ProfileBoardItemToken key={index} asset={asset} />;
        })}
    </ProfileBoardSection>
  );
};
