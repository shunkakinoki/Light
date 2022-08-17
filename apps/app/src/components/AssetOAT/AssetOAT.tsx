import type { FC } from "react";

import { AssetDetailsOAT } from "@lightdotso/app/components/AssetDetailsOAT";
import type { AssetDetailsOATProps } from "@lightdotso/app/components/AssetDetailsOAT";
import { AssetDetailsOATLoading } from "@lightdotso/app/components/AssetDetailsOATLoading";
import { AssetGrid } from "@lightdotso/app/components/AssetGrid";

import { BaseLoading } from "@lightdotso/app/components/BaseLoading";
import type { BaseOATProps } from "@lightdotso/app/components/BaseOAT";
import { BaseOAT } from "@lightdotso/app/components/BaseOAT";
import { useGalaxyCampaign } from "@lightdotso/app/hooks/useGalaxyCampaign";

export type AssetOATProps = Partial<Omit<BaseOATProps, "oat">> &
  AssetDetailsOATProps;

export const AssetOAT: FC<AssetOATProps> = ({ oat: initialToken, oatId }) => {
  const { campaign, isLoading } = useGalaxyCampaign(oatId, initialToken);
  return (
    <AssetGrid
      base={
        <>
          {isLoading && <BaseLoading />}
          {campaign && <BaseOAT oat={campaign.data.campaign} />}
        </>
      }
    >
      {campaign && <AssetDetailsOAT oatId={oatId} oat={campaign} />}
      {isLoading && <AssetDetailsOATLoading />}
    </AssetGrid>
  );
};
