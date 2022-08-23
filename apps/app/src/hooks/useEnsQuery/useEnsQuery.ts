import { safeFetchEnsQuery } from "@lightdotso/services";
import type { EnsQuery } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsQuery = (address?: string) => {
  const ensQueryFetcher = async (key, address) => {
    const result = await safeFetchEnsQuery(address)();
    return result.unwrapOr(null);
  };

  const { data, error, mutate } = useSWR<EnsQuery>(
    address ? [SwrKeys.ENS_QUERY, address] : null,
    ensQueryFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    domains: data?.domains,
    mutate: mutate,
  };
};
