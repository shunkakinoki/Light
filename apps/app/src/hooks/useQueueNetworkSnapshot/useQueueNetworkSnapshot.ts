import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useQueueNetworkSnapshot = (spaceId?: string) => {
  const queueFetcher = async () => {
    const url = `${LIGHT_API_URL}/api/queue/network/snapshot/${spaceId}`;
    await fetcher(url);
    return null;
  };

  const { data, error, mutate } = useSWR(
    spaceId ? [SwrKeys.QUEUE_NETWORK_SNAPSHOT, spaceId] : null,
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
