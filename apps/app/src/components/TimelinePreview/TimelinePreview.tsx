import type { FC } from "react";

import { TimelineNavigation } from "@lightdotso/app/components/TimelineNavigation";
import { TwitterNotice } from "@lightdotso/app/components/TwitterNotice";

export const TimelinePreview: FC = () => {
  return (
    <div className="flex flex-col md:flex-row py-12 mx-auto space-y-6 w-full lg:max-w-container">
      <div className="px-3 w-full md:w-1/4">
        <TimelineNavigation />
      </div>
      <div className="flex justify-center pt-12 md:pt-20 w-full md:w-3/4">
        <TwitterNotice />
      </div>
    </div>
  );
};
