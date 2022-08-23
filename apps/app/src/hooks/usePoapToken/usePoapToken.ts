import { safeFetchPoapToken } from "@lightdotso/services";
import type { PoapToken } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const usePoapToken = (tokenId?: string, initialToken?: PoapToken) => {
  const poapTokenFetcher = async (key, tokenId) => {
    const result = await safeFetchPoapToken(tokenId)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/poap/token/${tokenId}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error } = useSWR<PoapToken>(
    tokenId ? [SwrKeys.POAP_TOKEN, tokenId] : null,
    poapTokenFetcher,
    {
      fallbackData: initialToken,
    },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    token: data,
  };
};
