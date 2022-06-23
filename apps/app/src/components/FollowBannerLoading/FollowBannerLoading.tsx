import type { FC } from "react";

export const FollowBannerLoading: FC = () => {
  return (
    <div className="flex flex-col flex-1 grow justify-start">
      <div className="overflow-hidden w-24 h-3 bg-emphasis-medium rounded-md" />
      <div className="overflow-hidden mt-2 w-12 h-3 bg-emphasis-medium rounded-md" />
    </div>
  );
};
