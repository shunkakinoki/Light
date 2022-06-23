import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const AssetDetailsSegmentHeroLoading: FC = () => {
  return (
    <div className="flex overflow-hidden flex-col">
      <LoadingText className="mt-6 w-48 h-10" />
      <LoadingText className="mt-6 w-32 h-6" />
      <LoadingText className="mt-6 w-96 h-4" />
      <LoadingText className="mt-3 w-96 h-4" />
      <LoadingText className="mt-3 w-96 h-4" />
    </div>
  );
};
