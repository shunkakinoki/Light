import type { FC } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";

export const FollowButtonLoading: FC = () => {
  return (
    <div className="flex shrink justify-center items-center py-2 px-10 max-w-[101px] h-9 text-sm text-contrast-medium bg-emphasis-medium rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg animate-pulse">
      <LoadingDots />
    </div>
  );
};
