import type { GalaxyCampaign } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";

export type AssetDetailsOATProps = {
  oat?: GalaxyCampaign;
  oatId: string;
};

export const AssetDetailsOAT: FC<AssetDetailsOATProps> = ({ oat, oatId }) => {
  return (
    <>
      {oat?.data?.campaign?.name && (
        <AssetDetailsSegmentHero
          name={oat?.data?.campaign?.name}
          collectionName={oatId}
          description={oatId}
        />
      )}
    </>
  );
};
