import type { PoapToken } from "@lightdotso/types";
import type { FC } from "react";

import { AssetDetailsInternalButton } from "@lightdotso/app/components/AssetDetailsInternalButton";
import { AssetDetailsSegmentHero } from "@lightdotso/app/components/AssetDetailsSegmentHero";

export type AssetDetailsPoapProps = {
  token?: PoapToken;
  tokenId: string;
};

export const AssetDetailsPoap: FC<AssetDetailsPoapProps> = ({
  token: {
    event: { id, name, description },
  },
  tokenId,
}) => {
  return (
    <>
      <AssetDetailsSegmentHero
        name={name}
        collectionName={tokenId}
        description={description}
      />
      <div className="mt-8">
        <AssetDetailsInternalButton href={`/poap/${id}`}>
          View other people
        </AssetDetailsInternalButton>
      </div>
    </>
  );
};
