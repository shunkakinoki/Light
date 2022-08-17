import type { FC } from "react";

import { ProfileBoardItemEmpty } from "@lightdotso/app/components/ProfileBoardItemEmpty";
import { ProfileBoardItemOAT } from "@lightdotso/app/components/ProfileBoardItemOAT";
import { ProfileBoardSection } from "@lightdotso/app/components/ProfileBoardSection";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";
import { useGalaxyOats } from "@lightdotso/app/hooks/useGalaxyOats";

import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

export type ProfileBoardSectionOATProps = {
  address?: string;
};

export const ProfileBoardSectionOAT: FC<ProfileBoardSectionOATProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const { oats, isLoading } = useGalaxyOats(profileAddress);

  return (
    <ProfileBoardSection
      base={
        <>
          {oats && oats?.length === 0 && <ProfileBoardItemEmpty />}
          {oats &&
            typeof oats[0] !== "undefined" &&
            oats?.slice(0, BOARD_SECTION_NUMBER).map((OAT, index) => {
              return (
                <ProfileBoardItemOAT
                  key={index}
                  oat={OAT.campaign}
                  oatId={OAT.campaign.id}
                />
              );
            })}
        </>
      }
      disabled={oats?.length <= BOARD_SECTION_NUMBER}
      isLoading={isLoading}
      type="oat"
    >
      {oats &&
        typeof oats[0] !== "undefined" &&
        oats?.slice(BOARD_SECTION_NUMBER).map((OAT, index) => {
          return (
            <ProfileBoardItemOAT
              key={index}
              oat={OAT.campaign}
              oatId={OAT.campaign.id}
            />
          );
        })}
    </ProfileBoardSection>
  );
};
