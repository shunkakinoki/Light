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

export const poapHeaders = process.env.POAP_API_KEY
  ? new Headers({
      "X-API-KEY": process.env.POAP_API_KEY ?? "",
    })
  : undefined;

export const fetchPoapToken = (tokenId: string): Promise<PoapToken> => {
  return fetcher(`${ApiLinks.POAP}/token/${tokenId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const fetchPoapActions = (address: string): Promise<PoapActions> => {
  return fetcher(`${ApiLinks.POAP}/actions/scan/${address}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const fetchPoapEvent = (eventId: string): Promise<PoapEvent> => {
  return fetcher(`${ApiLinks.POAP}/events/id/${eventId}`, {
    method: "GET",
    headers: poapHeaders,
  });
};

export const fetchPoapEventTokens = (
  eventId: string,
  offset: number,
  limit?: number,
): Promise<PoapEventTokens> => {
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

export const fetchPoapGraph = (address: string): Promise<PoapGraph> => {
  return request(ApiLinks.POAP_GRAPH, POAP_GRAPH_QUERY, {
    address: address.toLowerCase(),
  });
};
