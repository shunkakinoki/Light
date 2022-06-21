import type { FC } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";

export const FollowButtonLoading: FC = () => {
  return (
    <div className="flex h-9 max-w-[101px] shrink animate-pulse items-center justify-center rounded-md bg-emphasis-medium py-2 px-10 text-sm text-contrast-medium ring-offset-bg focus:ring-2 focus:ring-primary focus:ring-offset-2">
      <LoadingDots />
    </div>
  );
};
