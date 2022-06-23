import type { FC } from "react";

import { FollowCardBannerLoading } from "@lightdotso/app/components/FollowCardBannerLoading";
import { FollowCardProofLoading } from "@lightdotso/app/components/FollowCardProofLoading";
import { NetworkStackLoading } from "@lightdotso/app/components/NetworkStackLoading";

export const FollowCardLoading: FC = () => {
  return (
    <li className="col-span-1 p-4 bg-emphasis-medium rounded-lg border border-contrast-lower shadow animate-pulse">
      <FollowCardBannerLoading />
      <div className="flex overflow-x-scroll overflow-y-visible items-center pt-[20px] pb-[18px] space-x-2">
        <NetworkStackLoading />
      </div>
      <FollowCardProofLoading />
    </li>
  );
};
