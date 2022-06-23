import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";

export const ProfileBoardItemTokenLoading: FC = () => {
  return (
    <tr className="flex w-full">
      <td className="flex grow items-center py-3 pl-4 border-b border-contrast-lower">
        <PlaceholderAvatarLoading className="w-6 md:w-8 h-6 md:h-8" />
        &nbsp;
        <LoadingText className="ml-3 w-32 h-4" />
      </td>
      <td className="flex shrink-0 items-center py-3 text-contrast-medium border-b border-contrast-lower">
        <LoadingText className="w-32 h-4" />
        &nbsp;
      </td>
      <td className="flex flex-initial shrink-0 justify-end items-center py-3 pr-4 w-1/6 text-contrast-medium border-b border-contrast-lower">
        <LoadingText className="w-24 h-4" />
      </td>
    </tr>
  );
};
