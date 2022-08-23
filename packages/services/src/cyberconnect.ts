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

import type { Validator } from "./result";
import { safeParse } from "./result";

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

export const safeFetchCyberconnectFollowers = (
  address: string,
  first: number,
  after?: string,
) => {
  return (validator?: Validator<CyberConnectFollowers>) => {
    return safeParse<CyberConnectFollowers>(fetchCyberconnectFollowers)(
      address,
      first,
      after,
    )(validator);
  };
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

export const safeFetchCyberconnectFollowings = (
  address: string,
  first: number,
  after?: string,
) => {
  return (validator?: Validator<CyberConnectFollowings>) => {
    return safeParse<CyberConnectFollowings>(fetchCyberconnectFollowings)(
      address,
      first,
      after,
    )(validator);
  };
};

export const fetchCyberconnectIdentity = (
  address: string,
): Promise<CyberConnectIdentity> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_IDENTITY_QUERY, {
    address: address,
  });
};

export const safeFetchCyberconnectIdentity = (address: string) => {
  return (validator?: Validator<CyberConnectIdentity>) => {
    return safeParse<CyberConnectIdentity>(fetchCyberconnectIdentity)(address)(
      validator,
    );
  };
};

export const fetchCyberconnectFeatured = (
  address: string,
): Promise<CyberConnectFeatured> => {
  return request(ApiLinks.CYBER_CONNECT, CYBERCONNECT_FEATURED_QUERY, {
    address: address,
  });
};

export const safeFetchCyberconnectFeatured = (address: string) => {
  return (validator?: Validator<CyberConnectFeatured>) => {
    return safeParse<CyberConnectFeatured>(fetchCyberconnectFeatured)(address)(
      validator,
    );
  };
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

export const safeFetchCyberconnectRankings = (
  first: number,
  after?: string,
) => {
  return (validator?: Validator<CyberConnectRankings>) => {
    return safeParse<CyberConnectRankings>(fetchCyberconnectRankings)(
      first,
      after,
    )(validator);
  };
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

export const safeFetchCyberconnectPopular = (
  address: string,
  first: number,
  after?: string,
) => {
  return (validator?: Validator<CyberConnectPopular>) => {
    return safeParse<CyberConnectPopular>(fetchCyberconnectPopular)(
      address,
      first,
      after,
    )(validator);
  };
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

export const safeFetchCyberconnectRecommendations = (
  address: string,
  first: number,
  after?: string,
) => {
  return (validator?: Validator<CyberConnectRecommendations>) => {
    return safeParse<CyberConnectRecommendations>(
      fetchCyberconnectRecommendations,
    )(
      address,
      first,
      after,
    )(validator);
  };
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

export const safeFetchCyberconnectStatus = (
  fromAddress: string,
  toAddress: string,
) => {
  return (validator?: Validator<CyberConnectStatus>) => {
    return safeParse<CyberConnectStatus>(fetchCyberconnectStatus)(
      fromAddress,
      toAddress,
    )(validator);
  };
};
