import { ApiLinks } from "@lightdotso/const";
import { GALAXY_OAT_QUERY } from "@lightdotso/queries";
import type { GalaxyOats } from "@lightdotso/types";
import { request } from "graphql-request";

export const fetchGalaxyOats = (address: string): Promise<GalaxyOats> => {
  return request(ApiLinks.GALAXY, GALAXY_OAT_QUERY, {
    address: address,
  });
};
