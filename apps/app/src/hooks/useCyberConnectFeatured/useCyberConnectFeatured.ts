import { safeFetchCyberconnectFeatured } from "@lightdotso/services";
import type { CyberConnectFeatured } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useCyberConnectFeatured = (address?: string) => {
  const cyberconnectFeaturedFetcher = async (key, address) => {
    const result = await safeFetchCyberconnectFeatured(address)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/cyberconnect/featured/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error, mutate } = useSWR<CyberConnectFeatured>(
    address ? [SwrKeys.CYBER_CONNECT_FEATURED, address] : null,
    cyberconnectFeaturedFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    featured: data?.featured,
    mutate: mutate,
  };
};
