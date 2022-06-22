import clsx from "clsx";
import type { FC } from "react";

import { TimelineListItem } from "@lightdotso/app/components/TimelineListItem";

export type TimelineListItemDescriptionProps = {
  className?: string;
  title: string;
  description: string;
};

export const TimelineListItemDescription: FC<
  TimelineListItemDescriptionProps
> = ({ children, className, title, description }) => {
  return (
    <>
      <div className="flex items-center space-x-3 border-contrast-medium bg-emphasis-high rounded-md px-3 md:px-4 py-2">
        <div className="basis-1/5 shrink-0 md:p-2">
          <TimelineListItem
            className={clsx(
              className,
              "bg-transparent h-full w-full hover:opacity-80",
            )}
          >
            {children}
          </TimelineListItem>
        </div>
        <div className="flex flex-col basis-4/5 text-contrast-medium overflow-hidden text-left max-w-full">
          <h3 className="text-contrast-high font-semibold text-base md:text-lg line-clamp-1">
            {title}
          </h3>
          <p className="pt-1 line-clamp-2 break-all text-xs md:text-sm">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
