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
        "aspect-w-1 aspect-h-1 flex flex-wrap overflow-hidden rounded-xl bg-contrast-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};
