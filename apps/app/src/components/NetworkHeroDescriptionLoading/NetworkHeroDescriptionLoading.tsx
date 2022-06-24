import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const NetworkHeroDescriptionLoading: FC = () => {
  return (
    <div className="mt-8 text-center lg:text-left">
      <div className="flex justify-start w-full">
        <LoadingText className="flex w-40 h-6" />
      </div>
      <p className="flex justify-start items-center mt-6 md:mt-5 text-lg md:text-base font-semibold leading-7 text-contrast-medium">
        <span className="mr-1 font-extrabold text-primary-lighter">
          <LoadingText className="flex w-8 h-4" />
        </span>
        People
      </p>
      <div className="flex flex-col md:pr-6 mt-6 space-y-3 w-full">
        <LoadingText className="w-full h-4" />
        <LoadingText className="w-full h-4" />
        <LoadingText className="w-full h-4" />
      </div>
    </div>
  );
};
