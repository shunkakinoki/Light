import type { FC } from "react";

import { LogoIcon } from "@lightdotso/app/components/LogoIcon";

export const TimelineEmpty: FC = () => {
  return (
    <div className="flex">
      <div className="flex justify-center pt-12 md:pt-20 w-full">
        <div className="w-full h-48">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold leading-7 text-contrast-higher">
              No activity yet
            </h1>
            <h2 className="mt-4 text-lg text-contrast-medium">
              Comeback later to get updates..!
            </h2>
            <div className="inline-flex items-center p-3 mt-4 text-sm text-contrast-higher hover:text-contrast-medium rounded-full">
              <LogoIcon className="w-14 h-14" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
