import type { FC } from "react";

import { LogoIcon } from "@lightdotso/app/components/LogoIcon";

export const TimelineEmpty: FC = () => {
  return (
    <div className="flex">
      <div className="flex w-full justify-center pt-12 md:pt-20">
        <div className="h-48 w-full">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold leading-7 text-contrast-higher">
              No activity yet
            </h1>
            <h2 className="mt-4 text-lg text-contrast-medium">
              Comeback later to get updates..!
            </h2>
            <div className="mt-4 inline-flex items-center rounded-full p-3 text-sm text-contrast-higher hover:text-contrast-medium">
              <LogoIcon className="h-14 w-14" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
