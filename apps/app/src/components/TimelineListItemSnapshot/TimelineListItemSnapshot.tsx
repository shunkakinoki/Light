import Link from "next/link";
import type { FC } from "react";

import type { BaseSnapshotProps } from "@lightdotso/app/components/BaseSnapshot";
import { BaseSnapshot } from "@lightdotso/app/components/BaseSnapshot";
import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { TimelineListItemDescription } from "@lightdotso/app/components/TimelineListItemDescription";

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
    <TimelineListItemDescription
      className={className}
      title={title}
      description={body}
    >
      <Link passHref href={`/dao/${id}`}>
        <a>
          <BaseSnapshot vote={vote} />
        </a>
      </Link>
    </TimelineListItemDescription>
  );
};
