import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const AssetDetailsSegmentHeroLoading: FC = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <LoadingText className="mt-6 h-10 w-48" />
      <LoadingText className="mt-6 h-6 w-32" />
      <LoadingText className="mt-6 h-4 w-96" />
      <LoadingText className="mt-3 h-4 w-96" />
      <LoadingText className="mt-3 h-4 w-96" />
    </div>
  );
};
