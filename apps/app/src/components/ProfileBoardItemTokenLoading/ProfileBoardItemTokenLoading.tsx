import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";

export const ProfileBoardItemTokenLoading: FC = () => {
  return (
    <tr className="flex w-full">
      <td className="flex grow items-center border-b border-contrast-lower py-3 pl-4">
        <PlaceholderAvatarLoading className="h-6 w-6 md:h-8 md:w-8" />
        &nbsp;
        <LoadingText className="ml-3 h-4 w-32" />
      </td>
      <td className="flex shrink-0 items-center border-b border-contrast-lower py-3 text-contrast-medium">
        <LoadingText className="h-4 w-32" />
        &nbsp;
      </td>
      <td className="flex w-1/6 flex-initial shrink-0 items-center justify-end border-b border-contrast-lower py-3 pr-4 text-contrast-medium">
        <LoadingText className="h-4 w-24" />
      </td>
    </tr>
  );
};
