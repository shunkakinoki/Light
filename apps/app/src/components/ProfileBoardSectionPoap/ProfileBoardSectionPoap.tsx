import type { FC } from "react";

import { ProfileBoardItemEmpty } from "@lightdotso/app/components/ProfileBoardItemEmpty";
import { ProfileBoardItemPoap } from "@lightdotso/app/components/ProfileBoardItemPoap";
import { ProfileBoardSection } from "@lightdotso/app/components/ProfileBoardSection";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";
import { usePoapActions } from "@lightdotso/app/hooks/usePoapActions";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";

export type ProfileBoardSectionPoapProps = {
  address?: string;
};

export const ProfileBoardSectionPoap: FC<ProfileBoardSectionPoapProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const { poaps, isLoading } = usePoapActions(profileAddress);

  return (
    <ProfileBoardSection
      base={
        <>
          {!poaps?.length && <ProfileBoardItemEmpty />}
          {poaps &&
            typeof poaps[0] !== "undefined" &&
            poaps?.slice(0, BOARD_SECTION_NUMBER).map((poap, index) => {
              return (
                <ProfileBoardItemPoap
                  key={index}
                  event={poap.event}
                  tokenId={poap.tokenId}
                />
              );
            })}
        </>
      }
      disabled={poaps?.length <= BOARD_SECTION_NUMBER}
      isLoading={isLoading}
      type="poap"
    >
      {poaps &&
        typeof poaps[0] !== "undefined" &&
        poaps?.slice(BOARD_SECTION_NUMBER).map((poap, index) => {
          return (
            <ProfileBoardItemPoap
              key={index}
              event={poap.event}
              tokenId={poap.tokenId}
            />
          );
        })}
    </ProfileBoardSection>
  );
};
