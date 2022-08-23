import { ApiLinks } from "@lightdotso/const";

import type {
  OpenseaAsset,
  OpenseaAssets,
  OpenseaEvents,
} from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { safeParse } from "./result";

const ASSET = "/asset";
const ASSETS = "/assets?owner=";
const EVENTS = "/events?account_address=";
const LIMIT = "&limit=30";
const CURSOR = "&cursor=";

export const openseaHeaders = new Headers({
  "X-API-KEY": process.env.OPENSEA_API_KEY ?? "",
});

export const fetchOpenseaAsset = (address: string, tokenId: string) => {
  return fetcher(`${ApiLinks.OPEN_SEA}${ASSET}/${address}/${tokenId}`, {
    method: "GET",
    headers: openseaHeaders,
  });
};

export const safeFetchOpenseaAsset = (spaceId: string) => {
  return (validator?: Validator<OpenseaAsset>) => {
    return safeParse<OpenseaAsset>(fetchOpenseaAsset)(spaceId)(validator);
  };
};

export const fetchOpenseaAssets = (address: string, cursor?: string) => {
  return fetcher(
    `${ApiLinks.OPEN_SEA}${ASSETS}${address}${LIMIT}${
      cursor ? `${CURSOR}${cursor}` : ""
    }`,
    {
      method: "GET",
      headers: openseaHeaders,
    },
  );
};

export const safeFetchOpenseaAssets = (address: string, cursor?: string) => {
  return (validator?: Validator<OpenseaAssets>) => {
    return safeParse<OpenseaAssets>(fetchOpenseaAssets)(address, cursor)(
      validator,
    );
  };
};

export const fetchOpenseaEvents = (address: string, cursor?: string) => {
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

export const safeFetchOpenseaEvents = (address: string, cursor?: string) => {
  return (validator?: Validator<OpenseaEvents>) => {
    return safeParse<OpenseaEvents>(fetchOpenseaEvents)(address, cursor)(
      validator,
    );
  };
};
