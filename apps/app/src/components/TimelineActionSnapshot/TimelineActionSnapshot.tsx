import type { SnapshotVote } from "@lightdotso/types";
import type { FC } from "react";

import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";

export type TimelineActionSnapshotProps = {
  data: SnapshotVote;
} & TimelineListItemProps;

export const TimelineActionSnapshot: FC<TimelineActionSnapshotProps> = ({
  data,
}) => {
  return (
    <>
      voted&nbsp;
      <a
        className="overflow-hidden text-sm font-normal text-contrast-high hover:underline text-ellipsis break-all"
        target="_blank"
        rel="noopener noreferrer"
        href={data?.proposal?.link}
      >
        {data?.proposal?.choices?.[data?.choice - 1]}
      </a>
      &nbsp;
    </>
  );
};
