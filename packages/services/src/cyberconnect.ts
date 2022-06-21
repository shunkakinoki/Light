import { ApiLinks } from "@lightdotso/const";
import {
  CYBERCONNECT_FOLLOWERS_QUERY,
  CYBERCONNECT_FOLLOWINGS_QUERY,
  CYBERCONNECT_STATUS_QUERY,
  CYBERCONNECT_IDENTITY_QUERY,
  CYBERCONNECT_FEATURED_QUERY,
  CYBERCONNECT_RECOMMENDATIONS_QUERY,
  CYBERCONNECT_RANKINGS_QUERY,
  CYBERCONNECT_POPULAR_QUERY,
} from "@lightdotso/queries";
import type {
  CyberConnectFeatured,
  CyberConnectFollowers,
  CyberConnectFollowings,
  CyberConnectIdentity,
  CyberConnectPopular,
  CyberConnectRankings,
  CyberConnectRecommendations,
  CyberConnectStatus,
} from "@lightdotso/types";
import { request } from "graphql-request";

export const fetchCyberconnectFollowers = (
  address: string,
  first: number,
  after?: string,
): Promise<CyberConnectFollowers> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_FOLLOWERS_QUERY, {
    address: address,
    first: first,
    after: after,
  });
};

export const fetchCyberconnectFollowings = (
  address: string,
  first: number,
  after?: string,
): Promise<CyberConnectFollowings> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_FOLLOWINGS_QUERY, {
    address: address,
    first: first,
    after: after,
  });
};

export const fetchCyberconnectIdentity = (
  address: string,
): Promise<CyberConnectIdentity> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_IDENTITY_QUERY, {
    address: address,
  });
};

export const fetchCyberconnectFeatured = (
  address: string,
): Promise<CyberConnectFeatured> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_FEATURED_QUERY, {
    address: address,
  });
};

export const fetchCyberconnectRankings = (
  first: number,
  after?: string,
): Promise<CyberConnectRankings> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_RANKINGS_QUERY, {
    first: first,
    after: after,
  });
};

export const fetchCyberconnectPopular = (
  address: string,
  first: number,
  after?: string,
): Promise<CyberConnectPopular> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_POPULAR_QUERY, {
    address: address,
    first: first,
    after: after,
  });
};

export const fetchCyberconnectRecommendations = (
  address: string,
  first: number,
  after?: string,
): Promise<CyberConnectRecommendations> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_RECOMMENDATIONS_QUERY, {
    address: address,
    first: first,
    after: after,
  });
};

export const fetchCyberconnectStatus = (
  fromAddress: string,
  toAddress: string,
): Promise<CyberConnectStatus> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_STATUS_QUERY, {
    fromAddr: fromAddress,
    toAddr: toAddress,
  });
};
