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
      return name;
    }
    return data.address;
  };

  const { data: address, mutate } = useSWR(
    name ? [SwrKeys.ENS_RESOLVER, name] : null,
    fetchEnsResolveName,
  );

  return {
    isLoading: isLoading,
    isError: isError,
    address: address,
    mutate: mutate,
  };
};
