import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
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
      <div className="flex w-full items-center justify-between text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-contrast-higher md:text-3xl">
          <span className="block xl:inline">{title}</span>
        </h1>
        <span className="relative z-0 hidden items-center rounded-md shadow-sm sm:inline-flex">
          <button
            type="button"
            className={clsx(
              "relative inline-flex items-center rounded-l-md border border-contrast-lower bg-bg-light p-2 text-sm font-medium text-contrast-medium",
              size !== 1
                ? "hover:text-contrast-higher"
                : "cursor-not-allowed hover:text-contrast-low",
            )}
            onClick={onBackClick}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          </button>
          <span className="border-y border-contrast-lower py-1 px-3 text-xs text-contrast-medium">
            <span className="text-sm font-semibold text-contrast-higher">
              {size}
            </span>
            &nbsp;&nbsp;/&nbsp;{endSize}
          </span>
          <button
            disabled={isLoadingMore || isEnd}
            type="button"
            className={clsx(
              "relative -ml-px inline-flex items-center rounded-r-md border border-contrast-lower bg-bg-light p-2 text-sm font-medium text-contrast-medium",
              size !== MAX_FOLLOW_SNAP_NUMBER && !isEnd
                ? "hover:text-contrast-higher"
                : "cursor-not-allowed hover:text-contrast-low",
            )}
            onClick={onClick}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
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
        <div className="mx-auto mt-12 flex sm:hidden lg:max-w-xl">
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
