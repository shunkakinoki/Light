import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const NetworkHeroDescriptionLoading: FC = () => {
  return (
    <div className="mt-8 text-center lg:text-left">
      <div className="flex w-full justify-center md:justify-start">
        <LoadingText className="flex h-6 w-40" />
      </div>
      <p className="mt-6 flex items-center justify-center text-lg font-semibold leading-7 text-contrast-medium md:mt-5 md:justify-start md:text-base">
        <span className="mr-1 font-extrabold text-primary-lighter">
          <LoadingText className="flex h-4 w-8" />
        </span>
        People
      </p>
      <div className="mt-6 flex w-full flex-col space-y-3 md:pr-6">
        <LoadingText className="h-4 w-full" />
        <LoadingText className="h-4 w-full" />
        <LoadingText className="h-4 w-full" />
      </div>
    </div>
  );
};
