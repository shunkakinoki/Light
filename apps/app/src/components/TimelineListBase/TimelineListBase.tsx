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
        "flex flex-col md:flex-row w-full lg:max-w-3xl",
        isCenter && "mx-auto",
      )}
    >
      <div className="basis-1/6 md:basis-1/3 shrink py-8 px-3">
        <TimelineNavigation />
      </div>
      <div className="flex px-4 w-full">
        <div className="flex overflow-visible flex-col justify-center py-8 space-y-3.5 w-full">
          {isLoadingInitial && <TimelineListLoading />}
          {isEmpty && <TimelineEmpty />}
          {children}
          {!isEnd && (
            <div className="pt-8 mx-auto w-full lg:max-w-xl">
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
