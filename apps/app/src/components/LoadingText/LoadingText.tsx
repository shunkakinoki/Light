import clsx from "clsx";
import type { FC } from "react";

export type LoadingTextProps = {
  className?: string;
};
export const LoadingText: FC<LoadingTextProps> = ({
  className = "h-3 w-6",
}) => {
  return (
    <span
      className={clsx(
        "animate-pulse rounded-full bg-emphasis-medium",
        className,
      )}
    />
  );
};
