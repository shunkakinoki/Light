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
      <div className="flex items-center space-x-3 rounded-sm border-contrast-medium bg-emphasis-high py-2 px-3 md:px-4">
        <div className="shrink-0 basis-1/5 md:p-2">
          <TimelineListItem
            className={clsx(
              className,
              "h-full w-full bg-transparent hover:opacity-80",
            )}
          >
            {children}
          </TimelineListItem>
        </div>
        <div className="flex max-w-full basis-4/5 flex-col overflow-hidden text-left text-contrast-medium">
          <h3 className="text-base font-semibold text-contrast-high line-clamp-1 md:text-lg">
            {title}
          </h3>
          <p className="break-all pt-1 text-xs line-clamp-2 md:text-sm">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
