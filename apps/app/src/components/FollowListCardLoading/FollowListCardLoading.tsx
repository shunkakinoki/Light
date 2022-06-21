import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";
import { FollowButtonLoading } from "@lightdotso/app/components/FollowButtonLoading";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";

export const FollowListCardLoading: FC = () => {
  return (
    <div className="flex w-full cursor-pointer items-center rounded-lg border border-contrast-lower bg-bg-lighter p-4 hover:bg-bg-light">
      <div className="group relative mr-6 shrink-0">
        <PlaceholderAvatarLoading />
      </div>
      <FollowBannerLoading />
      <div className="relative hidden shrink-0 px-6 py-1 md:inline-flex" />
      <div className="shrink-0 text-contrast-medium">
        <FollowButtonLoading />
      </div>
    </div>
  );
};
