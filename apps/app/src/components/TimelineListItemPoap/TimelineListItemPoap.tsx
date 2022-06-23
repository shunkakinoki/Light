import Link from "next/link";
import type { FC } from "react";

import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { TimelineListItemDescription } from "@lightdotso/app/components/TimelineListItemDescription";

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
    <TimelineListItemDescription
      className={className}
      title={name}
      description={description}
    >
      <Link passHref href={`/asset/poap/${tokenId}`}>
        <a>
          <BasePoap event={event} />
        </a>
      </Link>
    </TimelineListItemDescription>
  );
};
