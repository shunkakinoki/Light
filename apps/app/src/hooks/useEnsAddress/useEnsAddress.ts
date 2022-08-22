import useSWR from "swr";
import { useEnsAddress as useWagmiEnsAddress } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsAddress = (name?: string, initialEns?: string) => {
  const { data, isError, isLoading } = useWagmiEnsAddress({
    name: name,
    chainId: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEns = (key, address) => {
    if (isLoading || !data) {
      return null;
    }
    return data;
  };

  const { data: address, mutate } = useSWR(
    name ? [SwrKeys.ENS_ADDRESS, name] : null,
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
    address: address,
    isLoading: isLoading,
    isError: isError,
    mutate: mutate,
  };
};
