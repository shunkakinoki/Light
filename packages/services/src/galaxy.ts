import { ApiLinks } from "@lightdotso/const";
import { GALAXY_OAT_QUERY } from "@lightdotso/queries";
import type { CyberConnectFollowers } from "@lightdotso/types";
import { request } from "graphql-request";

export const fetchGalaxyOats = (
  address: string,
): Promise<CyberConnectFollowers> => {
  return request(ApiLinks.GALAXY, GALAXY_OAT_QUERY, {
    address: address,
  });
};
