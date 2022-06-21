import type { FC } from "react";

import { AssetDetailsSegmentHeroLoading } from "@lightdotso/app/components/AssetDetailsSegmentHeroLoading";
import { AssetDetailsSegmentMetaLoading } from "@lightdotso/app/components/AssetDetailsSegmentMetaLoading";
import { AssetDetailsSegmentProfileLoading } from "@lightdotso/app/components/AssetDetailsSegmentProfileLoading";

export const AssetDetailsNFTLoading: FC = () => {
  return (
    <div className="px-3">
      <AssetDetailsSegmentProfileLoading />
      <AssetDetailsSegmentHeroLoading />
      <AssetDetailsSegmentMetaLoading />
    </div>
  );
};
