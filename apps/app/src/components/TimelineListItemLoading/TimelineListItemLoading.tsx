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

  return <div className="aspect-1 flex w-full bg-emphasis-medium rounded-md" />;
};
