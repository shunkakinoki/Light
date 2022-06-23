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
      <div className="flex items-center py-2 px-3 md:px-4 space-x-3 bg-emphasis-high rounded-md border-contrast-medium">
        <div className="basis-1/5 shrink-0 md:p-2">
          <TimelineListItem
            className={clsx(
              className,
              "w-full h-full bg-transparent hover:opacity-80",
            )}
          >
            {children}
          </TimelineListItem>
        </div>
        <div className="flex overflow-hidden basis-4/5 flex-col max-w-full text-left text-contrast-medium">
          <h3 className="text-base md:text-lg font-semibold text-contrast-high line-clamp-1">
            {title}
          </h3>
          <p className="pt-1 text-xs md:text-sm break-all line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
