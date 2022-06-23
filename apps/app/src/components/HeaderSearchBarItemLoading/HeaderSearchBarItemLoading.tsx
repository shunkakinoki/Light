import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";

export const HeaderSearchBarItemLoading: FC = () => {
  return (
    <div className="flex items-center p-2 rounded-md">
      <div className="shrink-0 mr-4 w-10 h-10 bg-emphasis-medium rounded-full" />
      <FollowBannerLoading />
    </div>
  );
};
