import type { FC } from "react";

import { FollowBannerLoading } from "@lightdotso/app/components/FollowBannerLoading";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";
import { TimelineDigestLoading } from "@lightdotso/app/components/TimelineDigestLoading";
import type { TimelineListItemLoadingProps } from "@lightdotso/app/components/TimelineListItemLoading";
import { TimelineListItemLoading } from "@lightdotso/app/components/TimelineListItemLoading";

export type TimelineListCardLoadingProps = TimelineListItemLoadingProps;

export const TimelineListCardLoading: FC<TimelineListCardLoadingProps> = ({
  type,
}) => {
  return (
    <div className="flex flex-col p-3 md:p-4 w-full bg-bg-lighter hover:bg-bg-light rounded-xl border border-contrast-lower cursor-pointer">
      <div className="flex items-center pb-3">
        <div className="group relative shrink-0 mr-4">
          <PlaceholderAvatarLoading />
        </div>
        <FollowBannerLoading />
        <div className="hidden md:inline-flex relative shrink-0 py-1 px-6" />
        <div className="shrink-0 text-contrast-medium" />
      </div>
      <TimelineListItemLoading type={type} />
      <TimelineDigestLoading />
    </div>
  );
};
