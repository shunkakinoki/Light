import { ApiLinks } from "@lightdotso/const";
import type { NetworkRaw, Network } from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { safeParse } from "./result";

export const fetchNetworks = (address: string) => {
  return fetcher(`${ApiLinks.CACHE}/network/${address}`, {
    method: "GET",
  });
};

export const safeFetchNetworks = (address: string) => {
  return (validator?: Validator<Network>) => {
    return safeParse<Network>(fetchNetworks)(address)(validator);
  };
};

export const fetchNetworksRaw = (address: string) => {
  return fetcher(`${ApiLinks.CACHE}/network/raw/${address}`, {
    method: "GET",
  });
};

export const safeFetchNetworksRaw = (address: string) => {
  return (validator?: Validator<NetworkRaw>) => {
    return safeParse<NetworkRaw>(fetchNetworksRaw)(address)(validator);
  };
};
