import { ApiLinks } from "@lightdotso/const";
import { POAP_GRAPH_QUERY } from "@lightdotso/queries";
import type {
  PoapActions,
  PoapEvent,
  PoapGraph,
  PoapToken,
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

export const safeFetchPoapToken = (tokenId: string) => {
  return (validator?: Validator<PoapToken>) => {
    return safeParse<PoapToken>(fetchPoapToken)(tokenId)(validator);
  };
};

export const fetchPoapActions = (address: string) => {
  return fetcher(`${ApiLinks.POAP}/actions/scan/${address}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapActions = (address: string) => {
  return (validator?: Validator<PoapActions>) => {
    return safeParse<PoapActions>(fetchPoapActions)(address)(validator);
  };
};

export const fetchPoapEvent = (eventId: string) => {
  return fetcher(`${ApiLinks.POAP}/events/id/${eventId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapEvent = (eventId: string) => {
  return (validator?: Validator<PoapEvent>) => {
    return safeParse<PoapEvent>(fetchPoapEvent)(eventId)(validator);
  };
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

export const safeFetchPoapEventTokens = (
  eventId: string,
  offset: number,
  limit?: number,
) => {
  return (validator?: Validator<PoapEventTokens>) => {
    return safeParse<PoapEventTokens>(fetchPoapEventTokens)(
      eventId,
      offset,
      limit,
    )(validator);
  };
};

export const fetchPoapGraph = (address: string) => {
  return request(ApiLinks.POAP_GRAPH, POAP_GRAPH_QUERY, {
    address: address.toLowerCase(),
  });
};

export const safeFetchPoapGraph = (address: string) => {
  return (validator?: Validator<PoapGraph>) => {
    return safeParse<PoapGraph>(fetchPoapEventTokens)(address)(validator);
  };
};
