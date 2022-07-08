import type { FC } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";

export const TimelineDigestLoading: FC = () => {
  return (
    <div className="flex pt-3 md:pt-4">
      <div className="rounded-full bg-emphasis-medium px-3 pt-1 pb-2">
        <LoadingDots />
      </div>
    </div>
  );
};
