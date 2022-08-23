import { safeFetchCyberconnectStatus } from "@lightdotso/services";
import type { CyberConnectStatus } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useCyberConnectStatus = (
  address?: string,
  to?: string,
  initialStatus?: CyberConnectStatus,
) => {
  const cyberconnectStatusFetcher = async (key, address, to) => {
    const result = await safeFetchCyberconnectStatus(address, to)();
    if (result.isErr()) {
      const url = `${LIGHT_API_URL}/api/cyberconnect/status/${address}?to=${to}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const { data, error, mutate } = useSWR<CyberConnectStatus>(
    address && to ? [SwrKeys.CYBER_CONNECT_STATUS, address, to] : null,
    cyberconnectStatusFetcher,
    { fallbackData: initialStatus },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    isFollowing: data?.followStatus?.isFollowing,
    isFollowed: data?.followStatus?.isFollowed,
    mutate: mutate,
  };
};
