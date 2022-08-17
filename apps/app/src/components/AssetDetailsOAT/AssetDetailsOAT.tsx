import type { GalaxyCampaign } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";

export type AssetDetailsOATProps = {
  oat?: GalaxyCampaign;
  oatId: string;
};

export const AssetDetailsOAT: FC<AssetDetailsOATProps> = ({
  oat: {
    data: {
      campaign: { name },
    },
  },
  oatId,
}) => {
  return (
    <div className="px-3 pt-8">
      <AssetDetailsSegmentHero
        name={name}
        collectionName={oatId}
        description={oatId}
      />
    </div>
  );
};
