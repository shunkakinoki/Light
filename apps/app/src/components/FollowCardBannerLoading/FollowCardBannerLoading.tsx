import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";
import { FollowButtonLoading } from "@lightdotso/app/components/FollowButtonLoading";
import { PlaceholderProfileLoading } from "@lightdotso/app/components/PlaceholderProfileLoading";

export const FollowCardBannerLoading: FC = () => {
  return (
    <div className="flex justify-between items-center space-x-4 w-full">
      <PlaceholderProfileLoading />
      <FollowBannerLoading />
      <FollowButtonLoading />
    </div>
  );
};
