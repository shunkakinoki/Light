import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useQueueNetworkCyberConnect = (address?: string) => {
  const queueFetcher = async () => {
    const url = `${LIGHT_API_URL}/api/queue/network/cyberconnect/${address}`;
    await fetcher(url);
    return null;
  };

  const { data, error, mutate } = useSWR(
    address ? [SwrKeys.QUEUE_NETWORK_CYBERCONNECT, address] : null,
    queueFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    mutate: mutate,
  };
};
