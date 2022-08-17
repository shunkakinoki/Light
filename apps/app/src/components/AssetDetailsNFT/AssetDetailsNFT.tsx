import type { OpenseaAsset } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsExternalButton } from "@lightdotso/app/components/AssetDetailsExternalButton";
import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";
import { AssetDetailsSegmentMeta } from "@lightdotso/app/components/AssetDetailsSegmentMeta";
import { AssetDetailsSegmentProfile } from "@lightdotso/app/components/AssetDetailsSegmentProfile";
import type { PlaceholderProfileProps } from "@lightdotso/app/components/PlaceholderProfile";

export type AssetDetailsNFTProps = PlaceholderProfileProps & {
  asset: OpenseaAsset;
  tokenId: string;
};

export const AssetDetailsNFT: FC<AssetDetailsNFTProps> = ({
  asset: {
    asset_contract: { address: contractAddress },
    name,
    permalink,
    creator,
    owner: { address: ownerAddress },
    collection: { name: collectionName, description },
  },
  tokenId,
}) => {
  return (
    <div className="px-3">
      <AssetDetailsSegmentProfile address={ownerAddress} />
      <AssetDetailsSegmentHero
        name={name}
        collectionName={collectionName}
        description={description}
      />
      <AssetDetailsSegmentMeta
        address={ownerAddress}
        contractAddress={contractAddress ?? creator?.address}
        tokenId={tokenId}
      />
      {permalink && (
        <div className="mt-6">
          <AssetDetailsExternalButton href={permalink}>
            View on Opensea
          </AssetDetailsExternalButton>
        </div>
      )}
    </div>
  );
};
