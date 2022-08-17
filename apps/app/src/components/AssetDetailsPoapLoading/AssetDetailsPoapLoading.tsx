import type { FC } from "react";

import { AssetDetailsSegmentHeroLoading } from "@lightdotso/app/components/AssetDetailsSegmentHeroLoading";

export const AssetDetailsPoapLoading: FC = () => {
  return (
    <div className="px-3 pt-8">
      <AssetDetailsSegmentHeroLoading />
    </div>
  );
};
