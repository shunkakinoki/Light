import type { FC } from "react";

import type { AssetDetailsPoapProps } from "@lightdotso/app/components/AssetDetailsPoap";
import { AssetDetailsPoap } from "@lightdotso/app/components/AssetDetailsPoap";
import { AssetDetailsPoapLoading } from "@lightdotso/app/components/AssetDetailsPoapLoading";
import { AssetGrid } from "@lightdotso/app/components/AssetGrid";

import { BaseLoading } from "@lightdotso/app/components/BaseLoading";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { usePoapToken } from "@lightdotso/app/hooks/usePoapToken";

export type AssetPoapProps = Partial<Omit<BasePoapProps, "event">> &
  AssetDetailsPoapProps;

export const AssetPoap: FC<AssetPoapProps> = ({
  token: initialToken,
  tokenId,
}) => {
  const { token, isLoading } = usePoapToken(tokenId, initialToken);
  return (
    <AssetGrid
      base={
        <>
          {isLoading && <BaseLoading />}
          {token && <BasePoap event={token.event} />}
        </>
      }
    >
      {token && <AssetDetailsPoap token={token} tokenId={tokenId} />}
      {isLoading && <AssetDetailsPoapLoading />}
    </AssetGrid>
  );
};
