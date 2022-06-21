import type { FC } from "react";
import { useCallback } from "react";

import { TimelineListBase } from "@lightdotso/app/components/TimelineListBase";
import { TimelineListCard } from "@lightdotso/app/components/TimelineListCard";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";
import { useTimelineAddress } from "@lightdotso/app/hooks/useTimelineAddress";
import { useTimelineCategory } from "@lightdotso/app/hooks/useTimelineCategory";

type TimelineListAddressProps = {
  address?: string;
};

export const TimelineListAddress: FC<TimelineListAddressProps> = ({
  address,
}) => {
  const { profileAddress } = useProfileAddress(address);
  const { timelineCategoryState } = useTimelineCategory();

  const {
    timeline: followersPage,
    isEnd,
    isLoadingMore,
    isLoadingInitial,
    size,
    setSize,
  } = useTimelineAddress(
    profileAddress,
    timelineCategoryState.category !== "ALL"
      ? timelineCategoryState.category
      : undefined,
  );

  const timeline = followersPage ? [].concat(...followersPage) : [];

  const onClick = useCallback(() => {
    return setSize(size + 1);
  }, [setSize, size]);

  return (
    <TimelineListBase
      isCenter
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
