import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import type { MouseEventHandler, FC } from "react";
import { useEffect, useState } from "react";

import { FollowGridLayout } from "@lightdotso/app/components/FollowGridLayout";
import type { FollowGridLoadingProps } from "@lightdotso/app/components/FollowGridLoading";
import { FollowGridLoading } from "@lightdotso/app/components/FollowGridLoading";
import { MoreButton } from "@lightdotso/app/components/MoreButton";
import { MAX_FOLLOW_SNAP_NUMBER } from "@lightdotso/app/config/Query";
import { useIsMobile } from "@lightdotso/app/hooks/useIsMobile";

export type FollowListBaseProps = {
  title: string;
  isLoadingInitial: boolean;
  isEnd: boolean;
  isLoadingMore: boolean;
  size: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onBackClick: MouseEventHandler<HTMLButtonElement>;
} & FollowGridLoadingProps;

export const FollowSnapBase: FC<FollowListBaseProps> = ({
  title,
  children,
  isEnd,
  isLoadingInitial,
  isLoadingMore,
  number,
  size,
  onClick,
  onBackClick,
}) => {
  const [endSize, setEndSize] = useState(MAX_FOLLOW_SNAP_NUMBER);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isEnd) {
      setEndSize(size);
    }
  }, [isEnd, size]);

  return (
    <>
      <div className="flex justify-between items-center w-full text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-contrast-higher">
          <span className="block xl:inline">{title}</span>
        </h1>
        <span className="hidden sm:inline-flex relative z-0 items-center rounded-md shadow-sm">
          <button
            type="button"
            className={clsx(
              "inline-flex relative items-center p-2 text-sm font-medium text-contrast-medium bg-bg-light rounded-l-md border border-contrast-lower",
              size !== 1
                ? "hover:text-contrast-higher"
                : "hover:text-contrast-low cursor-not-allowed",
            )}
            onClick={onBackClick}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="w-3 h-3" aria-hidden="true" />
          </button>
          <span className="py-1 px-3 text-xs text-contrast-medium border-y border-contrast-lower">
            <span className="text-sm font-semibold text-contrast-higher">
              {size}
            </span>
            &nbsp;&nbsp;/&nbsp;{endSize}
          </span>
          <button
            disabled={isLoadingMore || isEnd}
            type="button"
            className={clsx(
              "inline-flex relative items-center p-2 -ml-px text-sm font-medium text-contrast-medium bg-bg-light rounded-r-md border border-contrast-lower",
              size !== MAX_FOLLOW_SNAP_NUMBER && !isEnd
                ? "hover:text-contrast-higher"
                : "hover:text-contrast-low cursor-not-allowed",
            )}
            onClick={onClick}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="w-3 h-3" aria-hidden="true" />
          </button>
        </span>
      </div>
      <FollowGridLayout className="mt-6 md:mt-8">
        {((!isMobile && isLoadingMore) || isLoadingInitial) && (
          <FollowGridLoading number={number} />
        )}
        {children}
      </FollowGridLayout>
      {!isEnd && (
        <div className="flex sm:hidden mx-auto mt-12 lg:max-w-xl">
          <MoreButton
            disabled={isLoadingMore || isEnd}
            className="w-full disabled:cursor-not-allowed"
            onClick={onClick}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </MoreButton>
        </div>
      )}
    </>
  );
};
