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
      <div className="mx-auto py-8 px-4 lg:max-w-5xl">
        <div className="flex w-full flex-col space-y-2 overflow-visible">
          {isLoadingInitial && <FollowListLoading />}
          {children}
        </div>
        {!isEnd && (
          <div className="mx-auto mt-12 flex lg:max-w-xl">
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
