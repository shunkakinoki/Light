import useSWR from "swr";
import { useEnsName } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEns = (address?: string, initialEns?: string) => {
  const { data, isError, isLoading } = useEnsName({
    address: address,
    chainId: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEns = (key, address) => {
    if (isLoading || !data) {
      return null;
    }
    return data;
  };

  const { data: ens, mutate } = useSWR(
    address ? [SwrKeys.ENS, address] : null,
    fetchEns,
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
      fallbackData: initialEns,
    },
  );

  return {
    isLoading: isLoading,
    isError: isError,
    ens: ens,
    mutate: mutate,
  };
};
