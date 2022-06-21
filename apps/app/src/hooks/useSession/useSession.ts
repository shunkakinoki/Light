import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useSession = () => {
  const sessionFetcher = async () => {
    const url = "/api/auth/session";
    const session = await fetcher(url);
    if (Object.keys(session).length) {
      return session;
    }
    return null;
  };

  const { data, error, mutate } = useSWR([SwrKeys.SESSION], sessionFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    session: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate: mutate,
  };
};
