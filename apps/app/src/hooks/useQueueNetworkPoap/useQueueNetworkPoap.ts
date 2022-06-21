import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useQueueNetworkPoap = (eventId?: string) => {
  const queueFetcher = async () => {
    const url = `${LIGHT_API_URL}/api/queue/network/poap/${eventId}`;
    await fetcher(url);
    return null;
  };

  const { data, error, mutate } = useSWR(
    eventId ? [SwrKeys.QUEUE_NETWORK_POAP, eventId] : null,
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
