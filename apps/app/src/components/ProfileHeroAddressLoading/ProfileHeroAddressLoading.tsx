import { Square2StackIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const ProfileHeroAddressLoading: FC = () => {
  return (
    <div className="mx-auto space-y-5 sm:mx-0 sm:max-w-xl sm:space-y-4">
      <h2 className="flex justify-center overflow-hidden text-ellipsis text-2xl font-extrabold tracking-tight text-contrast-higher sm:text-3xl md:justify-start">
        <LoadingText className="h-4 w-36" />
      </h2>
      <div className="mx-auto flex flex-row justify-center space-x-3 md:justify-start">
        <div className="flex items-center rounded-md bg-bg-dark py-1.5 px-3">
          <LoadingText className="mr-2 h-4 w-24" />
          <Square2StackIcon className="h-6 w-6 text-contrast-low hover:text-contrast-medium" />
        </div>
      </div>
    </div>
  );
};
