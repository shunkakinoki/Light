import { DuplicateIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const ProfileHeroAddressLoading: FC = () => {
  return (
    <div className="mx-auto sm:mx-0 space-y-5 sm:space-y-4 sm:max-w-xl">
      <h2 className="flex overflow-hidden justify-center md:justify-start text-2xl sm:text-3xl font-extrabold tracking-tight text-contrast-higher text-ellipsis">
        <LoadingText className="w-36 h-4" />
      </h2>
      <div className="flex flex-row justify-center md:justify-start mx-auto space-x-3">
        <div className="flex items-center py-1.5 px-3 bg-bg-dark rounded-md">
          <LoadingText className="mr-2 w-24 h-4" />
          <DuplicateIcon className="w-6 h-6 text-contrast-low hover:text-contrast-medium" />
        </div>
      </div>
    </div>
  );
};
