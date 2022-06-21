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
      voted &nbsp;
      <a
        className="text-sm font-normal text-contrast-high overflow-hidden break-all text-ellipsis hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        href={data?.proposal?.link}
      >
        {data?.proposal?.choices?.[data?.choice]}
      </a>
      &nbsp;
    </>
  );
};
