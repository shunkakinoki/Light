import clsx from "clsx";
import type { FC } from "react";

type PlaceholderProfileLoadingProps = {
  className?: string;
};

export const PlaceholderProfileLoading: FC<PlaceholderProfileLoadingProps> = ({
  className = "h-12 w-12",
}) => {
  return (
    <div
      className={clsx(
        className,
        "shrink-0 rounded-full bg-emphasis-medium opacity-100",
      )}
    />
  );
};
