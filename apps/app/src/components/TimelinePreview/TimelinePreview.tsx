import type { FC } from "react";

import { TimelineNavigation } from "@lightdotso/app/components/TimelineNavigation";
import { TwitterNotice } from "@lightdotso/app/components/TwitterNotice";

export const TimelinePreview: FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col space-y-6 py-12 md:flex-row lg:max-w-container">
      <div className="w-full px-3 md:w-1/4">
        <TimelineNavigation />
      </div>
      <div className="flex w-full justify-center pt-12 md:w-3/4 md:pt-20">
        <TwitterNotice />
      </div>
    </div>
  );
};
