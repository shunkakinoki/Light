import type { FC } from "react";

import { TimelineListCardLoading } from "@lightdotso/app/components/TimelineListCardLoading";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { useTimelineCategory } from "@lightdotso/app/hooks/useTimelineCategory";

export const TimelineListLoading: FC = () => {
  const { timelineCategoryState } = useTimelineCategory();

  if (timelineCategoryState.category === "ALL") {
    return (
      <>
        {[...Array(FOLLOW_QUERY_NUMBER)].map((i, key) => {
          return (
            <TimelineListCardLoading
              key={key}
              type={Math.random() < 0.3 ? "nft" : "desc"}
            />
          );
        })}
      </>
    );
  }

  if (timelineCategoryState.category === "NFT") {
    return (
      <>
        {[...Array(FOLLOW_QUERY_NUMBER)].map((value, key) => {
          return <TimelineListCardLoading key={key} type="nft" />;
        })}
      </>
    );
  }

  return (
    <>
      {[...Array(FOLLOW_QUERY_NUMBER)].map((value, key) => {
        return <TimelineListCardLoading key={key} type="desc" />;
      })}
    </>
  );
};
