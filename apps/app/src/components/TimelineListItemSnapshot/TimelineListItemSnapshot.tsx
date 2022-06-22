import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import type { BaseSnapshotProps } from "@lightdotso/app/components/BaseSnapshot";
import { BaseSnapshot } from "@lightdotso/app/components/BaseSnapshot";
import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { TimelineListItem } from "@lightdotso/app/components/TimelineListItem";

export type TimelineListItemSnapshotProps = TimelineListItemProps &
  BaseSnapshotProps;

export const TimelineListItemSnapshot: FC<TimelineListItemSnapshotProps> = ({
  className,
  vote,
}) => {
  const {
    proposal: { title, body },
    space: { id },
  } = vote;

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
            <Link passHref href={`/dao/${id}`}>
              <a>
                <BaseSnapshot vote={vote} />
              </a>
            </Link>
          </TimelineListItem>
        </div>
        <div className="flex flex-col basis-4/5 text-contrast-medium overflow-hidden text-left max-w-full">
          <h3 className="text-contrast-high font-semibold text-lg line-clamp-1">
            {title}
          </h3>
          <p className="pt-2 line-clamp-2 break-all">{body}</p>
        </div>
      </div>
    </>
  );
};
