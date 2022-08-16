import { ApiLinks } from "@lightdotso/const";
import type { GalaxyOats, GalaxyCampaign } from "@lightdotso/types";

import { fetcher } from "./fetcher";

export const fetchGalaxyCampaign = (oatId: string): Promise<GalaxyCampaign> => {
  return fetcher(`${ApiLinks.CACHE}/galaxy/campaign/${oatId}`, {
    method: "GET",
  });
};

export const fetchGalaxyOats = (address: string): Promise<GalaxyOats> => {
  return fetcher(`${ApiLinks.CACHE}/galaxy/${address}`, {
    method: "GET",
  });
};
