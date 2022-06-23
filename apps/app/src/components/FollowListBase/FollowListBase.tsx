import type { MouseEventHandler, FC } from "react";

import { FollowListLoading } from "@lightdotso/app/components/FollowListLoading";
import { MoreButton } from "@lightdotso/app/components/MoreButton";

export type FollowListBaseProps = {
  isLoadingInitial: boolean;
  isEnd: boolean;
  isLoadingMore: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const FollowListBase: FC<FollowListBaseProps> = ({
  children,
  isEnd,
  isLoadingInitial,
  isLoadingMore,
  onClick,
}) => {
  return (
    <>
      <div className="py-8 px-4 mx-auto lg:max-w-5xl">
        <div className="flex overflow-visible flex-col space-y-2 w-full">
          {isLoadingInitial && <FollowListLoading />}
          {children}
        </div>
        {!isEnd && (
          <div className="flex mx-auto mt-12 lg:max-w-xl">
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
    </>
  );
};
