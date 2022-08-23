import { safeFetchOpenseaAsset } from "@lightdotso/services";
import type { OpenseaAsset } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useOpenSeaAsset = (
  address?: string,
  tokenId?: string,
  initialAsset?: OpenseaAsset,
) => {
  const openseaAssetFetcher = async (key, address) => {
    const result = await safeFetchOpenseaAsset(address, tokenId)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/opensea/asset/${address}/${tokenId}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error, mutate } = useSWR<OpenseaAsset>(
    address && tokenId ? [SwrKeys.OPENSEA_ASSET, address, tokenId] : null,
    openseaAssetFetcher,
    { fallbackData: initialAsset },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    asset: data,
    mutate: mutate,
  };
};
