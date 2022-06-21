import type { ZerionAssets } from "@lightdotso/types";
import { useMemo } from "react";
import useSWR from "swr";

import { getAssets } from "@lightdotso/app/libs/services/zerion";

export const useZerionAssets = (address?: string) => {
  const { data, error } = useSWR<ZerionAssets>(
    address ? `/api/zerion/tokens/${address}` : null,
    () => {
      return getAssets(address);
    },
  );

  const assets = useMemo(() => {
    return data
      ? data.map(asset => {
          const price = asset.price?.value ?? 0;
          return {
            icon_url: asset?.icon_url,
            name: asset?.name,
            decimals: asset?.decimals,
            token: asset?.asset_code,
            symbol: asset?.symbol,
            amount: asset?.quantity / 10 ** asset?.decimals,
            type: asset?.type,
            value: (price * asset?.quantity) / 10 ** asset?.decimals,
          };
        })
      : null;
  }, [data]);

  return {
    isLoading: !error && !assets,
    isError: !!error,
    data: data,
    assets: assets
      ?.filter(asset => {
        return asset?.decimals !== 0;
      })
      .sort((a, b) => {
        return b.value - a.value;
      }),
  };
};
