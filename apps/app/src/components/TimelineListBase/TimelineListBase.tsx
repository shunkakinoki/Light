import clsx from "clsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import type { MouseEventHandler, FC } from "react";

import { MoreButton } from "@lightdotso/app/components/MoreButton";
import { TimelineEmpty } from "@lightdotso/app/components/TimelineEmpty";
import { TimelineListLoading } from "@lightdotso/app/components/TimelineListLoading";
import { TimelineNavigation } from "@lightdotso/app/components/TimelineNavigation";

TimeAgo.addDefaultLocale(en);

export type TimelineListBaseProps = {
  isCenter?: boolean;
  isEmpty: boolean;
  isLoadingInitial: boolean;
  isEnd: boolean;
  isLoadingMore: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TimelineListBase: FC<TimelineListBaseProps> = ({
  children,
  isCenter = false,
  isEmpty,
  isEnd,
  isLoadingInitial,
  isLoadingMore,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "flex w-full flex-col md:flex-row lg:max-w-3xl",
        isCenter && "mx-auto",
      )}
    >
      <div className="shrink basis-1/6 px-3 md:basis-1/3 md:py-8">
        <TimelineNavigation />
      </div>
      <div className="flex w-full px-3">
        <div className="flex w-full flex-col justify-center space-y-3.5 overflow-visible py-8">
          {isLoadingInitial && <TimelineListLoading />}
          {isEmpty && <TimelineEmpty />}
          {children}
          {!isEnd && (
            <div className="w-full pt-8 lg:max-w-lg">
              <MoreButton
                disabled={isLoadingMore || isEnd}
                className="w-full disabled:cursor-not-allowed"
                onClick={onClick}
              >
                {isLoadingMore ? "Loading..." : "Load more"}
              </MoreButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
