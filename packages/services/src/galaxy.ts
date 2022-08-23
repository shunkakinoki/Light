import { ApiLinks } from "@lightdotso/const";
import type { GalaxyOats, GalaxyCampaign } from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { safeParse } from "./result";

export const fetchGalaxyCampaign = (oatId: string): Promise<GalaxyCampaign> => {
  return fetcher(`${ApiLinks.CACHE}/galaxy/campaign/${oatId}`, {
    method: "GET",
  });
};

export const safeFetchGalaxyCampaign = (address: string) => {
  return (validator?: Validator<GalaxyCampaign>) => {
    return safeParse<GalaxyCampaign>(fetchGalaxyCampaign)(address)(validator);
  };
};

export const fetchGalaxyOats = (address: string): Promise<GalaxyOats> => {
  return fetcher(`${ApiLinks.CACHE}/galaxy/${address}`, {
    method: "GET",
  });
};

export const safeFetchGalaxyOats = (address: string) => {
  return (validator?: Validator<GalaxyOats>) => {
    return safeParse<GalaxyOats>(fetchGalaxyOats)(address)(validator);
  };
};
