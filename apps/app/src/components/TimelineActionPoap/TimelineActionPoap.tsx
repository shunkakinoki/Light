import type { PoapAction } from "@lightdotso/types";
import Link from "next/link";
import type { FC } from "react";

import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";

export type TimelineActionPoapProps = {
  data: PoapAction;
} & TimelineListItemProps;

export const TimelineActionPoap: FC<TimelineActionPoapProps> = ({ data }) => {
  return (
    <>
      Attended &nbsp;
      <Link passHref href={`/poap/${data?.event?.id}`}>
        <a className="text-sm font-normal text-contrast-high overflow-hidden break-all text-ellipsis hover:underline">
          {data?.event?.name}
        </a>
      </Link>
      &nbsp;
      {data?.event?.city && (
        <>
          <span className="text-contrast-low text-sm">at</span>
          &nbsp;
          {data?.event?.city}
        </>
      )}
    </>
  );
};
