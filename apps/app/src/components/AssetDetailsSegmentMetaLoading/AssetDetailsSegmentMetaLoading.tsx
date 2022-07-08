import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";

export const AssetDetailsSegmentMetaLoading: FC = () => {
  return (
    <div className="mt-8 w-full">
      <div className="text-sm font-normal leading-5 text-contrast-high">
        Owned by
      </div>
      <LoadingText className="mt-2 flex h-6 w-32" />
      <div className="mt-4 text-sm font-normal leading-5 text-contrast-high">
        Created by
      </div>
      <LoadingText className="mt-2 flex h-6 w-32" />
      <div className="mt-4 text-sm font-normal leading-5 text-contrast-high">
        Token ID
      </div>
      <LoadingText className="mt-2 flex h-6 w-24" />
    </div>
  );
};
