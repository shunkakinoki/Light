import useSWR from "swr";
import { useEnsResolver as useEnsResolverWagmi } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsResolveName = (name: string) => {
  const { data, isError, isLoading } = useEnsResolverWagmi({
    name: name,
    chainId: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEnsResolveName = async (_key, name) => {
    if (isLoading || !data) {
      return null;
    }
    return data.address;
  };

  const { data: address, mutate } = useSWR(
    name ? [SwrKeys.ENS_RESOLVER, name] : null,
    fetchEnsResolveName,
    {
      onSuccess: () => {
        if (isLoading) {
          setTimeout(() => {
            return mutate();
          }, 300);
        } else {
          return mutate(data, false);
        }
      },
    },
  );

  return {
    isLoading: isLoading,
    isError: isError,
    address: address,
    mutate: mutate,
  };
};
