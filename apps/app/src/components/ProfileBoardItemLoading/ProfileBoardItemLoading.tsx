import type { FC } from "react";

export const ProfileBoardItemLoading: FC = () => {
  return (
    <div className="aspect-h-1 aspect-w-1 w-full animate-pulse rounded-lg bg-emphasis-medium text-center hover:border-contrast-high" />
  );
};
