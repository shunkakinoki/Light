import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";
import { FollowButtonLoading } from "@lightdotso/app/components/FollowButtonLoading";
import { PlaceholderProfileLoading } from "@lightdotso/app/components/PlaceholderProfileLoading";

export const FollowCardBannerLoading: FC = () => {
  return (
    <div className="flex w-full items-center justify-between space-x-4">
      <PlaceholderProfileLoading />
      <FollowBannerLoading />
      <FollowButtonLoading />
    </div>
  );
};
