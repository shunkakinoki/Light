import type { PoapToken } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsInternalButton } from "@lightdotso/app/components/AssetDetailsInternalButton";
import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";
import { AssetDetailsSegmentMeta } from "@lightdotso/app/components/AssetDetailsSegmentMeta";
import type { PlaceholderProfileProps } from "@lightdotso/app/components/PlaceholderProfile";

export type AssetDetailsPoapProps = PlaceholderProfileProps & {
  token?: PoapToken;
  tokenId: string;
};

export const AssetDetailsPoap: FC<AssetDetailsPoapProps> = ({
  address,
  token: {
    event: { id, name, description },
  },
  tokenId,
}) => {
  return (
    <div className="px-3">
      <AssetDetailsSegmentHero
        name={name}
        collectionName={tokenId}
        description={description}
      />
      <AssetDetailsSegmentMeta
        address={address}
        contractAddress={address}
        tokenId={tokenId}
      />
      <div className="mt-8">
        <AssetDetailsInternalButton href={`/poap/${id}`}>
          View other people
        </AssetDetailsInternalButton>
      </div>
    </div>
  );
};
