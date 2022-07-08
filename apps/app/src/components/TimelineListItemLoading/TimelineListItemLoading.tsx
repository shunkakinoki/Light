import type { FC } from "react";

export type TimelineListItemLoadingProps = {
  type: "nft" | "desc";
};

export const TimelineListItemLoading: FC<TimelineListItemLoadingProps> = ({
  type,
}) => {
  if (type === "desc") {
    return <div className="flex h-24 w-full rounded-md bg-emphasis-medium" />;
  }

  return <div className="flex aspect-1 w-full rounded-md bg-emphasis-medium" />;
};
