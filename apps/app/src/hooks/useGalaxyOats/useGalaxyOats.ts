import { safeFetchGalaxyOats } from "@lightdotso/services";
import type { GalaxyOats } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useGalaxyOats = (address?: string) => {
  const oatsFetcher = async (key, address) => {
    const result = await safeFetchGalaxyOats(address)();
    if (result.isErr()) {
      // TODO: Add API endpoint
      return;
    }
    return result.value;
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
