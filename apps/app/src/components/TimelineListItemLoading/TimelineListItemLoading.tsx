import type { FC } from "react";

export type TimelineListItemLoadingProps = {
  type: "nft" | "desc";
};

export const TimelineListItemLoading: FC<TimelineListItemLoadingProps> = ({
  type,
}) => {
  if (type === "desc") {
    return <div className="flex w-full h-24 bg-emphasis-medium rounded-md" />;
  }

  return <div className="flex w-full aspect-1 bg-emphasis-medium rounded-md" />;
};
