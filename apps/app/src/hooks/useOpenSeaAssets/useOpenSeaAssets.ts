import { safeFetchOpenseaAssets } from "@lightdotso/services";
import type { OpenseaAssets } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useOpenSeaAssets = (address?: string) => {
  const openseaAssetsFetcher = async (key, address) => {
    const result = await safeFetchOpenseaAssets(address)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/opensea/assets/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error, mutate } = useSWR<OpenseaAssets>(
    address ? [SwrKeys.OPENSEA_ASSETS, address] : null,
    openseaAssetsFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    assets: data?.assets,
    mutate: mutate,
  };
};
