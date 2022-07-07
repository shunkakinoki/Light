import type { FC } from "react";

export const FollowBannerLoading: FC = () => {
  return (
    <div className="flex flex-1 grow flex-col justify-start">
      <div className="h-3 w-24 overflow-hidden rounded-md bg-emphasis-medium" />
      <div className="mt-2 h-3 w-12 overflow-hidden rounded-md bg-emphasis-medium" />
    </div>
  );
};
