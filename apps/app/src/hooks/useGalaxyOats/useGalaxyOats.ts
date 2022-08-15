import { fetchGalaxyOats } from "@lightdotso/services";
import type { GalaxyOats } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useGalaxyOats = (address?: string) => {
  const oatsFetcher = async (key, address) => {
    const result = await fetchGalaxyOats(address);
    return result;
  };

  const { data, error } = useSWR<GalaxyOats>(
    address ? [SwrKeys.GALAXY_OATS, address] : null,
    oatsFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    oats: data?.data?.addressInfo?.recentParticipation?.list,
  };
};
