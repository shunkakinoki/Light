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
    <div className="flex flex-col w-full cursor-pointer rounded-xl border border-contrast-lower bg-bg-lighter p-3 hover:bg-bg-light">
      <div className="flex pb-3 items-center">
        <div className="group relative mr-4 shrink-0">
          <PlaceholderAvatarLoading />
        </div>
        <FollowBannerLoading />
        <div className="relative hidden shrink-0 px-6 py-1 md:inline-flex" />
        <div className="shrink-0 text-contrast-medium" />
      </div>
      <TimelineListItemLoading type={type} />
      <TimelineDigestLoading />
    </div>
  );
};
