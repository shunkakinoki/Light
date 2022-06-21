import type { FC } from "react";
import { useCallback } from "react";

import { TimelineListBase } from "@lightdotso/app/components/TimelineListBase";
import { TimelineListCard } from "@lightdotso/app/components/TimelineListCard";
import { useTimelineCategory } from "@lightdotso/app/hooks/useTimelineCategory";
import { useTimelineNetworkPoap } from "@lightdotso/app/hooks/useTimelineNetworkPoap";

type TimelineListNetworkPoapProps = {
  eventId: string;
};

export const TimelineListNetworkPoap: FC<TimelineListNetworkPoapProps> = ({
  eventId,
}) => {
  const { timelineCategoryState } = useTimelineCategory();

  const {
    timeline: timelinePage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useTimelineNetworkPoap(
    eventId,
    timelineCategoryState.category !== "ALL"
      ? timelineCategoryState.category
      : undefined,
  );

  const timeline = timelinePage ? [].concat(...timelinePage) : [];

  const onClick = useCallback(() => {
    return setSize(size + 1);
  }, [setSize, size]);

  return (
    <TimelineListBase
      isEmpty={!isLoadingInitial && timeline.length === 0}
      isEnd={isEnd}
      isLoadingMore={isLoadingMore}
      isLoadingInitial={isLoadingInitial}
      onClick={onClick}
    >
      {timeline &&
        timeline.length > 0 &&
        typeof timeline[0] !== "undefined" &&
        timeline.map((item, id) => {
          return (
            <TimelineListCard
              key={id}
              address={item.address}
              item={item}
              date={new Date(item.createdAt)}
            />
          );
        })}
    </TimelineListBase>
  );
};
