import { ApiLinks } from "@lightdotso/const";

import type {
  OpenseaAsset,
  OpenseaAssets,
  OpenseaEvents,
} from "@lightdotso/types";

import { fetcher } from "./fetcher";

const ASSET = "/asset";
const ASSETS = "/assets?owner=";
const EVENTS = "/events?account_address=";
const CURSOR = "&cursor=";

export const openseaHeaders = new Headers({
  "X-API-KEY": process.env.OPENSEA_API_KEY ?? "",
});

export const fetchOpenseaAsset = (
  address: string,
  tokenId: string,
): Promise<OpenseaAsset> => {
  return fetcher(`${ApiLinks.OPEN_SEA}${ASSET}/${address}/${tokenId}`, {
    method: "GET",
    headers: openseaHeaders,
  });
};

export const fetchOpenseaAssets = (address: string): Promise<OpenseaAssets> => {
  return fetcher(`${ApiLinks.OPEN_SEA}${ASSETS}${address}`, {
    method: "GET",
    headers: openseaHeaders,
  });
};

export const fetchOpenseaEvents = (
  address: string,
  cursor?: string,
): Promise<OpenseaEvents> => {
  return fetcher(
    `${ApiLinks.OPEN_SEA}${EVENTS}${address}${
      cursor ? `${CURSOR}${cursor}` : ""
    }`,
    {
      method: "GET",
      headers: openseaHeaders,
    },
  );
};
