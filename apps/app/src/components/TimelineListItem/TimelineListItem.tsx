import clsx from "clsx";
import type { FC } from "react";

export type TimelineListItemProps = {
  className?: string;
};

export const TimelineListItem: FC<TimelineListItemProps> = ({
  children,
  className,
}) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={clsx(
        "flex overflow-hidden flex-wrap bg-contrast-medium rounded-xl aspect-w-1 aspect-h-1",
        className,
      )}
    >
      {children}
    </div>
  );
};
