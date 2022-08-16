import { ApiLinks } from "@lightdotso/const";
import type { GalaxyOats } from "@lightdotso/types";

import { fetcher } from "./fetcher";

export const fetchGalaxyOats = (address: string): Promise<GalaxyOats> => {
  return fetcher(`${ApiLinks.CACHE}/galaxy/${address}`, {
    method: "GET",
  });
};
