import useSWR from "swr";
import { useEnsLookup } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEns = (address?: string, initialEns?: string) => {
  const [, lookupAddress] = useEnsLookup();

  const fetchEns = async (key, address) => {
    const result = await lookupAddress({ address });
    if (result.error) {
      throw new Error(result.error.message);
    }
    if (!result.data) {
      return null;
    }
    return result.data;
  };

  const {
    data: ens,
    error,
    mutate,
  } = useSWR(address ? [SwrKeys.ENS, address] : null, fetchEns, {
    fallbackData: initialEns,
  });

  return {
    isLoading: !error && !ens,
    isError: !!error,
    ens: ens,
    mutate: mutate,
  };
};
