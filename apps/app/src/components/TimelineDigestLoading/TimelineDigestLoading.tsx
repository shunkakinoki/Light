import type { FC } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";

export const TimelineDigestLoading: FC = () => {
  return (
    <div className="flex pt-3">
      <div className="rounded-full px-3 pt-1 pb-2 bg-emphasis-medium">
        <LoadingDots />
      </div>
    </div>
  );
};
