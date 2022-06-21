import type { FC } from "react";

import { ProfileBoardItemTokenLoading } from "@lightdotso/app/components/ProfileBoardItemTokenLoading";
import { BOARD_SECTION_NUMBER } from "@lightdotso/app/config/Board";

export const ProfileBoardSectionTokenLoading: FC = () => {
  return (
    <>
      {[...Array(BOARD_SECTION_NUMBER)].map((value, key) => {
        return <ProfileBoardItemTokenLoading key={key} />;
      })}
    </>
  );
};
