import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";
import { FollowButtonLoading } from "@lightdotso/app/components/FollowButtonLoading";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";

export const FollowListCardLoading: FC = () => {
  return (
    <div className="flex items-center p-4 w-full bg-bg-lighter hover:bg-bg-light rounded-lg border border-contrast-lower cursor-pointer">
      <div className="group relative shrink-0 mr-6">
        <PlaceholderAvatarLoading />
      </div>
      <FollowBannerLoading />
      <div className="hidden md:inline-flex relative shrink-0 py-1 px-6" />
      <div className="shrink-0 text-contrast-medium">
        <FollowButtonLoading />
      </div>
    </div>
  );
};
