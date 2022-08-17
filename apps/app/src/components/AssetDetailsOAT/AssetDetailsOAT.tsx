import type { GalaxyCampaign } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";
import { AssetDetailsSegmentMeta } from "@lightdotso/app/components/AssetDetailsSegmentMeta";
import type { PlaceholderProfileProps } from "@lightdotso/app/components/PlaceholderProfile";

export type AssetDetailsOATProps = PlaceholderProfileProps & {
  oat?: GalaxyCampaign;
  oatId: string;
};

export const AssetDetailsOAT: FC<AssetDetailsOATProps> = ({
  address,
  oat: {
    data: {
      campaign: { name },
    },
  },
  oatId,
}) => {
  return (
    <div className="px-3">
      <AssetDetailsSegmentHero
        name={name}
        collectionName={oatId}
        description={oatId}
      />
      <AssetDetailsSegmentMeta
        address={address}
        contractAddress={address}
        tokenId={oatId}
      />{" "}
    </div>
  );
};
