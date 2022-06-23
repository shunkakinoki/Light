import type { FC } from "react";

export const BaseLoading: FC = () => {
  return (
    <div className="aspect-1 object-cover w-full h-full bg-emphasis-medium rounded-md animate-pulse" />
  );
};
