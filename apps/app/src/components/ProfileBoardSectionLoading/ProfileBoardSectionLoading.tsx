import type { FC } from "react";

import { ProfileBoardItemLoading } from "@lightdotso/app/components/ProfileBoardItemLoading";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";

export const ProfileBoardSectionLoading: FC = () => {
  return (
    <>
      {[...Array(BOARD_SECTION_NUMBER)].map((value, key) => {
        return <ProfileBoardItemLoading key={key} />;
      })}
    </>
  );
};
