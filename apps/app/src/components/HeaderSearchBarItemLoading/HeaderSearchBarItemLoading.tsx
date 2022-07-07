import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";

export const HeaderSearchBarItemLoading: FC = () => {
  return (
    <div className="flex items-center rounded-md p-2">
      <div className="mr-4 h-10 w-10 shrink-0 rounded-full bg-emphasis-medium" />
      <FollowBannerLoading />
    </div>
  );
};
