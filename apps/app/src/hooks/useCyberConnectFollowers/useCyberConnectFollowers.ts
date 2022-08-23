import { safeFetchCyberconnectFollowers } from "@lightdotso/services";
import type { CyberConnectFollowers } from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type CyberConnectFollowersObjectKey = {
  address: string;
  after?: string;
  first?: number;
};

export const useCyberConnectFollowers = (address?: string, first?: number) => {
  const { mutate } = useSWRConfig();

  const cyberconnectFollowersFethcer = async (
    key,
    obj: CyberConnectFollowersObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/cyberconnect/followers/${obj?.address}?first=${obj?.first}`;

    if (obj?.after) {
      const result = await safeFetchCyberconnectFollowers(
        obj?.address,
        obj?.first,
        obj?.after,
      )();
      if (result.isErr()) {
        const backupResult = await fetcher(`${url}&after=${obj?.after}`);
        return backupResult;
      }
      return result.value;
    }

    const result = await safeFetchCyberconnectFollowers(
      obj?.address,
      obj?.first,
    )();
    if (result.isErr()) {
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: CyberConnectFollowers,
  ) => {
    if (
      (previousPageData && !previousPageData?.identity?.followers) ||
      !address ||
      !first
    ) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.CYBER_CONNECT_FOLLOWERS,
        <CyberConnectFollowersObjectKey>{
          address: address,
          first: first,
          after: "0",
        },
      ];
    }

    return [
      SwrKeys.CYBER_CONNECT_FOLLOWERS,
      <CyberConnectFollowersObjectKey>{
        address: address,
        first: first,
        after: previousPageData?.identity?.followers?.pageInfo?.endCursor,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<CyberConnectFollowers>(getKey, cyberconnectFollowersFethcer);

  useEffect(() => {
    if (data && data[0]?.identity?.followers?.list) {
      const followersPage = data?.map(page => {
        return page?.identity?.followers?.list;
      });
      const recentFollowers = followersPage[followersPage.length - 1].flat();
      const followersWithAvatar = [
        ...recentFollowers.filter(followers => {
          return followers.avatar !== "";
        }),
      ];
      const followersWithDomain = [
        ...recentFollowers.filter(followers => {
          return followers.domain !== "";
        }),
      ];
      followersWithAvatar.forEach(followers => {
        mutate([SwrKeys.ENS_AVATAR, followers.domain], followers.avatar);
      });
      followersWithDomain.forEach(followers => {
        mutate([SwrKeys.ENS, followers.address], followers.domain);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    followers: data?.map(page => {
      return page?.identity?.followers?.list;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd:
      data &&
      !data[data.length - 1]?.identity?.followers?.pageInfo?.hasNextPage,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
