import { safeFetchCyberconnectIdentity } from "@lightdotso/services";
import type { CyberConnectIdentity } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useCyberConnectIdentity = (address?: string) => {
  const cyberconnectIdentityFetcher = async (key, address) => {
    const result = await safeFetchCyberconnectIdentity(address)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/cyberconnect/identity/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error, mutate } = useSWR<CyberConnectIdentity>(
    address ? [SwrKeys.CYBER_CONNECT_IDENTITY, address] : null,
    cyberconnectIdentityFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    identity: data?.identity,
    mutate: mutate,
  };
};
