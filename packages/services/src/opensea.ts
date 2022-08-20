import { ApiLinks } from "@lightdotso/const";

import type {
  OpenseaAsset,
  OpenseaAssets,
  OpenseaEvents,
} from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { fromPromise, zodValidate } from "./result";

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

export const safeFetchOpenseaAsset = async (
  address: string,
  tokenId: string,
  validator?: Validator<OpenseaAsset>,
) => {
  const result = fromPromise<OpenseaAsset>(fetchOpenseaAsset(address, tokenId));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};

export const fetchOpenseaAssets = (address: string): Promise<OpenseaAssets> => {
  return fetcher(`${ApiLinks.OPEN_SEA}${ASSETS}${address}`, {
    method: "GET",
    headers: openseaHeaders,
  });
};

export const safeFetchOpenseaAssets = async (
  address: string,
  validator?: Validator<OpenseaAssets>,
) => {
  const result = fromPromise<OpenseaAssets>(fetchOpenseaAssets(address));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
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

export const safeFetchOpenseaEvents = async (
  address: string,
  validator?: Validator<OpenseaEvents>,
) => {
  const result = fromPromise<OpenseaEvents>(fetchOpenseaEvents(address));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};
