import { ApiLinks } from "@lightdotso/const";
import { POAP_GRAPH_QUERY } from "@lightdotso/queries";
import type {
  PoapActions,
  PoapEvent,
  PoapGraph,
  PoapEventTokens,
} from "@lightdotso/types";
import { request } from "graphql-request";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { fromPromise, zodValidate, safeParse } from "./result";

export const poapHeaders = process.env.POAP_API_KEY
  ? new Headers({
      "X-API-KEY": process.env.POAP_API_KEY ?? "",
    })
  : undefined;

export const fetchPoapToken = (tokenId: string) => {
  return fetcher(`${ApiLinks.POAP}/token/${tokenId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapToken = <PoapToken>(tokenId: string) => {
  return (validator?: Validator<PoapToken>) => {
    return safeParse(fetchPoapToken)(tokenId)(validator);
  };
};

export const fetchPoapActions = (address: string) => {
  return fetcher(`${ApiLinks.POAP}/actions/scan/${address}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapActions = async (
  address: string,
  validator?: Validator<PoapActions>,
) => {
  const result = fromPromise<PoapActions>(fetchPoapActions(address));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};

export const fetchPoapEvent = (eventId: string) => {
  return fetcher(`${ApiLinks.POAP}/events/id/${eventId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapEvent = async (
  eventId: string,
  validator?: Validator<PoapEvent>,
) => {
  const result = fromPromise<PoapEvent>(fetchPoapEvent(eventId));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};

export const fetchPoapEventTokens = (
  eventId: string,
  offset: number,
  limit?: number,
) => {
  return fetcher(
    `${ApiLinks.POAP}/event/${eventId}/poaps?offset=${offset}${
      limit && `&limit=${limit}`
    }`,
    {
      method: "GET",
      headers: poapHeaders,
    },
  );
};

export const safeFetchPoapEventTokens = async (
  eventId: string,
  offset: number,
  limit?: number,
  validator?: Validator<PoapEventTokens>,
) => {
  const result = fromPromise<PoapEventTokens>(
    fetchPoapEventTokens(eventId, offset, limit),
  );
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};

export const fetchPoapGraph = (address: string) => {
  return request(ApiLinks.POAP_GRAPH, POAP_GRAPH_QUERY, {
    address: address.toLowerCase(),
  });
};

export const safeFetchPoapGraph = async (
  address: string,
  validator?: Validator<PoapGraph>,
) => {
  const result = fromPromise<PoapGraph>(fetchPoapGraph(address));
  if (validator) {
    return zodValidate(validator)(result);
  }
  return result;
};
