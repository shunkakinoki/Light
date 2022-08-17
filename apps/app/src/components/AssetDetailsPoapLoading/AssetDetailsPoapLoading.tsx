import type { FC } from "react";

import { AssetDetailsSegmentHeroLoading } from "@lightdotso/app/components/AssetDetailsSegmentHeroLoading";
import { AssetDetailsSegmentMetaLoading } from "@lightdotso/app/components/AssetDetailsSegmentMetaLoading";

export const AssetDetailsPoapLoading: FC = () => {
  return (
    <div className="px-3">
      <AssetDetailsSegmentHeroLoading />
      <AssetDetailsSegmentMetaLoading />
    </div>
  );
};
