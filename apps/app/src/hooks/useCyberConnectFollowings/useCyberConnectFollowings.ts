import { safeFetchCyberconnectFollowings } from "@lightdotso/services";
import type { CyberConnectFollowings } from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type CyberConnectFollowingsObjectKey = {
  address: string;
  after?: string;
  first?: number;
};

export const useCyberConnectFollowings = (address?: string, first?: number) => {
  const { mutate } = useSWRConfig();

  const cyberconnectFollowingsFetcher = async (
    key,
    obj: CyberConnectFollowingsObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/cyberconnect/followings/${obj?.address}?first=${obj?.first}`;

    if (obj?.after) {
      const result = await safeFetchCyberconnectFollowings(
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

    const result = await safeFetchCyberconnectFollowings(
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
    previousPageData: CyberConnectFollowings,
  ) => {
    if (
      (previousPageData && !previousPageData?.identity?.followings) ||
      !address ||
      !first
    ) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.CYBER_CONNECT_FOLLOWINGS,
        <CyberConnectFollowingsObjectKey>{
          address: address,
          first: first,
          after: "0",
        },
      ];
    }

    return [
      SwrKeys.CYBER_CONNECT_FOLLOWINGS,
      <CyberConnectFollowingsObjectKey>{
        address: address,
        first: first,
        after: previousPageData?.identity?.followings?.pageInfo?.endCursor,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<CyberConnectFollowings>(
      getKey,
      cyberconnectFollowingsFetcher,
    );

  useEffect(() => {
    if (data && data[0]?.identity?.followings?.list) {
      const followingsPage = data?.map(page => {
        return page?.identity?.followings?.list;
      });
      const recentFollowings = followingsPage[followingsPage.length - 1].flat();
      const followingsWithAvatar = [
        ...recentFollowings.filter(followings => {
          return followings.avatar !== "";
        }),
      ];
      const followingsWithDomain = [
        ...recentFollowings.filter(followings => {
          return followings.domain !== "";
        }),
      ];
      followingsWithAvatar.forEach(followings => {
        mutate([SwrKeys.ENS_AVATAR, followings.domain], followings.avatar);
      });
      followingsWithDomain.forEach(followings => {
        mutate([SwrKeys.ENS, followings.address], followings.domain);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    followings: data?.map(page => {
      return page?.identity?.followings?.list;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd:
      data &&
      !data[data.length - 1]?.identity?.followings?.pageInfo?.hasNextPage,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
