import type { FC } from "react";

export const BaseLoading: FC = () => {
  return (
    <div className="aspect-1 h-full w-full animate-pulse rounded-md bg-emphasis-medium object-cover" />
  );
};
