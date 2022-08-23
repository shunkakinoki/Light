import { safeFetchGalaxyCampaign } from "@lightdotso/services";
import type { GalaxyCampaign } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useGalaxyCampaign = (
  oatId?: string,
  initialData?: GalaxyCampaign,
) => {
  const campaignFetcher = async (key, oatId) => {
    const result = await safeFetchGalaxyCampaign(oatId)();
    if (result.isErr()) {
      // TODO: Add API endpoint
      return;
    }
    return result.value;
  };

  const { data, error } = useSWR<GalaxyCampaign>(
    oatId ? [SwrKeys.GALAXY_CAMPAIGN, oatId] : null,
    campaignFetcher,
    {
      fallbackData: initialData,
    },
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    campaign: data,
  };
};
