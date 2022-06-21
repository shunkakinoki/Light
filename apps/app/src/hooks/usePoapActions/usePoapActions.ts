import { fetchPoapActions } from "@lightdotso/services";
import type { PoapActions } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const usePoapActions = (address?: string) => {
  const poapsFetcher = async (key, address) => {
    const result = await fetchPoapActions(address);
    //@ts-expect-error
    if (result.error) {
      const url = `${LIGHT_API_URL}/api/poap/poaps/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result;
  };

  const { data, error } = useSWR<PoapActions>(
    address ? [SwrKeys.POAP_ACTIONS, address] : null,
    poapsFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    poaps: data,
  };
};
