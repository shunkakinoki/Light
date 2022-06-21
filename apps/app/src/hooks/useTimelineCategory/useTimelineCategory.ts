import { useRecoilState } from "recoil";

import { timelineCategoryAtom } from "@lightdotso/app/atoms/timelineCategory";

export const useTimelineCategory = () => {
  const [timelineCategoryState, setTimelineCategoryState] =
    useRecoilState(timelineCategoryAtom);

  return {
    timelineCategoryState,
    setTimelineCategoryState,
  } as const;
};
