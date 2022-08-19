import { ApiLinks } from "@lightdotso/const";
import { POAP_GRAPH_QUERY } from "@lightdotso/queries";
import type {
  PoapActions,
  PoapEvent,
  PoapToken,
  PoapGraph,
  PoapEventTokens,
} from "@lightdotso/types";
import { request } from "graphql-request";

import { fetcher } from "./fetcher";
import { fromPromiseWithError } from "./result";

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

export const safeFetchPoapToken = async (tokenId: string) => {
  return fromPromiseWithError<PoapToken>(fetchPoapToken(tokenId));
};

export const fetchPoapActions = (address: string) => {
  return fetcher(`${ApiLinks.POAP}/actions/scan/${address}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapActions = async (address: string) => {
  return fromPromiseWithError<PoapActions>(fetchPoapActions(address));
};

export const fetchPoapEvent = (eventId: string) => {
  return fetcher(`${ApiLinks.POAP}/events/id/${eventId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const safeFetchPoapEvent = async (eventId: string) => {
  return fromPromiseWithError<PoapEvent>(fetchPoapEvent(eventId));
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
) => {
  return fromPromiseWithError<PoapEventTokens>(
    fetchPoapEventTokens(eventId, offset, limit),
  );
};

export const fetchPoapGraph = (address: string) => {
  return request(ApiLinks.POAP_GRAPH, POAP_GRAPH_QUERY, {
    address: address.toLowerCase(),
  });
};

export const safeFetchPoapGraph = async (address: string) => {
  return fromPromiseWithError<PoapGraph>(fetchPoapGraph(address));
};
