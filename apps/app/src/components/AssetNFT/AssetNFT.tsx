import type { FC } from "react";

import type { AssetDetailsNFTProps } from "@lightdotso/app/components/AssetDetailsNFT";
import { AssetDetailsNFT } from "@lightdotso/app/components/AssetDetailsNFT";
import { AssetDetailsNFTLoading } from "@lightdotso/app/components/AssetDetailsNFTLoading";
import { AssetGrid } from "@lightdotso/app/components/AssetGrid";

import { BaseLoading } from "@lightdotso/app/components/BaseLoading";
import { BaseNFT } from "@lightdotso/app/components/BaseNFT";
import type { BaseNFTProps } from "@lightdotso/app/components/BaseNFT";
import { useOpenSeaAsset } from "@lightdotso/app/hooks/useOpenSeaAsset";

export type AssetNFTProps = Partial<BaseNFTProps> &
  Pick<AssetDetailsNFTProps, "address" | "tokenId">;

export const AssetNFT: FC<AssetNFTProps> = ({
  asset: initialAsset,
  address,
  tokenId,
}) => {
  const { asset, isLoading } = useOpenSeaAsset(address, tokenId, initialAsset);

  return (
    <AssetGrid
      base={
        <>
          {asset && <BaseNFT asset={asset} />}
          {isLoading && <BaseLoading />}
        </>
      }
    >
      {asset && (
        <AssetDetailsNFT address={address} asset={asset} tokenId={tokenId} />
      )}
      {isLoading && <AssetDetailsNFTLoading />}
    </AssetGrid>
  );
};
