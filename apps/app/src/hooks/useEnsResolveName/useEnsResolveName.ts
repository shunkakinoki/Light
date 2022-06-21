import { fetchEnsResolveNameQuery } from "@lightdotso/services";
import useSWR from "swr";
import { useEnsResolveName as useEnsResolveNameWagmi } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsResolveName = (name: string) => {
  const [, getEnsResolver] = useEnsResolveNameWagmi();

  const fetchEns = async (key, name) => {
    const result = await getEnsResolver({ name: name });
    if (result.error) {
      throw new Error(result.error.message);
    }
    if (!result.data) {
      try {
        const result = await fetchEnsResolveNameQuery(name);
        return result?.domains?.length > 0
          ? result?.domains[0]?.resolvedAddress?.id
          : null;
      } catch (err) {
        console.error(err?.message);
      }
    }
    return result.data;
  };

  const {
    data: address,
    error,
    mutate,
  } = useSWR(name ? [SwrKeys.ENS_RESOLVER, name] : null, fetchEns);

  return {
    isLoading: !error && !address,
    isError: !!error,
    address: address,
    mutate: mutate,
  };
};
