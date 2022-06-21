import type { MouseEventHandler, FC } from "react";

import { FollowGridLayout } from "@lightdotso/app/components/FollowGridLayout";
import { FollowGridLoading } from "@lightdotso/app/components/FollowGridLoading";
import { FollowMore } from "@lightdotso/app/components/FollowMore";
import { FOLLOW_GRID_NUMBER } from "@lightdotso/app/config/Query";

export type FollowGridBaseProps = {
  isLoadingInitial: boolean;
  isEnd: boolean;
  isLoadingMore: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const FollowGridBase: FC<FollowGridBaseProps> = ({
  children,
  isEnd,
  isLoadingInitial,
  isLoadingMore,
  onClick,
}) => {
  return (
    <>
      <FollowGridLayout className="mt-10 md:mt-14">
        {isLoadingInitial && <FollowGridLoading number={FOLLOW_GRID_NUMBER} />}
        {children}
      </FollowGridLayout>
      {!isEnd && (
        <FollowMore onClick={onClick}>
          {isLoadingMore ? "Loading..." : "Load more"}
        </FollowMore>
      )}
    </>
  );
};
