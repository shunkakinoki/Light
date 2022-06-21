import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { TimelineListItem } from "@lightdotso/app/components/TimelineListItem";

export type TimelineListItemPoapProps = {
  tokenId: string;
} & TimelineListItemProps &
  BasePoapProps;

export const TimelineListItemPoap: FC<TimelineListItemPoapProps> = ({
  className,
  event,
  tokenId,
}) => {
  const { description, name } = event;

  return (
    <>
      <div className="flex items-center space-x-3 border-contrast-medium bg-emphasis-high rounded-md p-2">
        <div className="basis-1/5 shrink-0 p-2">
          <TimelineListItem
            className={clsx(
              className,
              "bg-transparent h-full w-full hover:opacity-80",
            )}
          >
            <Link passHref href={`/asset/poap/${tokenId}`}>
              <a>
                <BasePoap event={event} />
              </a>
            </Link>
          </TimelineListItem>
        </div>
        <div className="flex flex-col basis-4/5 text-contrast-medium overflow-hidden text-left max-w-full">
          <h3 className="text-contrast-high font-semibold text-lg line-clamp-1">
            {name}
          </h3>
          <p className="pt-2 line-clamp-2 break-all">{description}</p>
        </div>
      </div>
    </>
  );
};
