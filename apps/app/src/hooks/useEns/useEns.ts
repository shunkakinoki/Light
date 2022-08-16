import useSWR from "swr";
import { useEnsName } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export const useEns = (address?: string, initialEns?: string) => {
  const { data, isError, isLoading } = useEnsName({
    address: address,
    chainId: 1,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEns = async (key, address) => {
    if (isLoading || !data) {
      return splitAddress(address);
    }
    return data;
  };

  const { data: ens, mutate } = useSWR(
    address ? [SwrKeys.ENS, address] : null,
    fetchEns,
    {
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
