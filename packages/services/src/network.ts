import { ApiLinks } from "@lightdotso/const";
import type { NetworkRaw } from "@lightdotso/types";

import { fetcher } from "./fetcher";

export const fetchNetworks = (address: string): Promise<NetworkRaw> => {
  return fetcher(`${ApiLinks.CACHE}/network/${address}`, {
    method: "GET",
  });
};

export const fetchNetworksRaw = (address: string): Promise<NetworkRaw> => {
  return fetcher(`${ApiLinks.CACHE}/network/raw/${address}`, {
    method: "GET",
  });
};
