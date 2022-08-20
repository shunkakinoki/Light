export const CYBERCONNECT_FOLLOWERS_QUERY = /* GraphQL */ `
  query lookup($address: String!, $first: Int!, $after: String) {
    identity(address: $address) {
      followers(first: $first, after: $after, namespace: "Light") {
        pageInfo {
          endCursor
          hasNextPage
        }
        list {
          address
          avatar
          domain
        }
      }
    }
  }
`;

export const CYBERCONNECT_FOLLOWINGS_QUERY = /* GraphQL */ `
  query lookup($address: String!, $first: Int!, $after: String) {
    identity(address: $address) {
      followings(first: $first, after: $after, namespace: "Light") {
        pageInfo {
          endCursor
          hasNextPage
        }
        list {
          address
          avatar
          domain
        }
      }
    }
  }
`;

export const CYBERCONNECT_IDENTITY_QUERY = /* GraphQL */ `
  query lookup($address: String!) {
    identity(address: $address) {
      address
      avatar
      domain
      followingCount(namespace: "Light")
      followerCount(namespace: "Light")
      social {
        twitter
      }
    }
  }
`;

export const CYBERCONNECT_POPULAR_QUERY = /* GraphQL */ `
  query popular($address: String!, $first: Int!, $after: String) {
    popular(
      fromAddr: $address
      first: $first
      after: $after
      tags: { list: [PLAZA, NFTMARKET, FEATURED] }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      list {
        address
        avatar
        domain
        followerCount
        recommendationReason
      }
    }
  }
`;

export const CYBERCONNECT_RECOMMENDATIONS_QUERY = /* GraphQL */ `
  query recommendations($address: String!, $first: Int!, $after: String) {
    recommendations(address: $address, first: $first, after: $after) {
      data {
        pageInfo {
          endCursor
          hasNextPage
        }
        list {
          address
          avatar
          domain
          followerCount
          recommendationReason
        }
      }
    }
  }
`;

export const CYBERCONNECT_RANKINGS_QUERY = /* GraphQL */ `
  query rankings($first: Int!, $after: String) {
    rankings(first: $first, after: $after, rankings: ["Light"]) {
      pageInfo {
        endCursor
        hasNextPage
      }
      list {
        address
        avatar
        domain
        followerCount
      }
    }
  }
`;

export const CYBERCONNECT_FEATURED_QUERY = /* GraphQL */ `
  query featured($address: String!) {
    featured(fromAddr: $address) {
      address
      followerCount
      recommendationReason
    }
  }
`;

export const CYBERCONNECT_STATUS_QUERY = /* GraphQL */ `
  query status($fromAddr: String!, $toAddr: String!) {
    followStatus(fromAddr: $fromAddr, toAddr: $toAddr, namespace: "Light") {
      isFollowed
      isFollowing
    }
  }
`;
