import type { FC } from "react";

import { FollowCardBannerLoading } from "@lightdotso/app/components/FollowCardBannerLoading";
import { FollowCardProofLoading } from "@lightdotso/app/components/FollowCardProofLoading";
import { NetworkStackLoading } from "@lightdotso/app/components/NetworkStackLoading";

export const FollowCardLoading: FC = () => {
  return (
    <li className="col-span-1 animate-pulse rounded-lg border border-contrast-lower bg-emphasis-medium p-4 shadow">
      <FollowCardBannerLoading />
      <div className="flex items-center space-x-2 overflow-y-visible overflow-x-scroll pt-[20px] pb-[18px]">
        <NetworkStackLoading />
      </div>
      <FollowCardProofLoading />
    </li>
  );
};
