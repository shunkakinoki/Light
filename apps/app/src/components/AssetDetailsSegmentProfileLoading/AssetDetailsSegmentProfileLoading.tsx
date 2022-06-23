import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { PlaceholderProfileLoading } from "@lightdotso/app/components/PlaceholderProfileLoading";

export const AssetDetailsSegmentProfileLoading: FC = () => {
  return (
    <div className="flex items-center">
      <PlaceholderProfileLoading />
      <LoadingText className="ml-4 w-28 h-4" />
    </div>
  );
};
