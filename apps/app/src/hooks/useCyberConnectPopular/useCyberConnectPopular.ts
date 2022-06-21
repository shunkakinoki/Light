import { fetchCyberconnectPopular } from "@lightdotso/services";
import type {
  CyberConnectIdentity,
  CyberConnectPopular,
} from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type CyberConnectPopularObjectKey = {
  address: string;
  after?: string;
  first?: number;
};

export const useCyberConnectPopular = (address?: string, first?: number) => {
  const { mutate } = useSWRConfig();

  const cyberconnectPopularFethcer = async (
    key,
    obj: CyberConnectPopularObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/cyberconnect/popular/${obj?.address}?first=${obj?.first}`;

    if (obj?.after) {
      const result = await fetchCyberconnectPopular(
        obj?.address,
        obj?.first,
        obj?.after,
      );
      //@ts-expect-error
      if (result.error) {
        const backupResult = await fetcher(`${url}&after=${obj?.after}`);
        return backupResult;
      }
      return result;
    }

    const result = await fetchCyberconnectPopular(obj?.address, obj?.first);
    //@ts-expect-error
    if (result.error) {
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: CyberConnectPopular,
  ) => {
    if (
      (previousPageData && !previousPageData?.popular?.list) ||
      !address ||
      !first
    ) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.CYBER_CONNECT_POPULAR,
        <CyberConnectPopularObjectKey>{ address: address, first: first },
      ];
    }

    return [
      SwrKeys.CYBER_CONNECT_POPULAR,
      <CyberConnectPopularObjectKey>{
        address: address,
        first: first,
        after: previousPageData?.popular?.pageInfo?.endCursor,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<CyberConnectPopular>(getKey, cyberconnectPopularFethcer, {
      initialSize: 1,
      revalidateAll: false,
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      persistSize: false,
    });

  useEffect(() => {
    if (data && data[0]?.popular?.list) {
      const popularPage = data?.map(page => {
        return page?.popular?.list;
      });
      const recentPopular = popularPage[popularPage.length - 1];
      const popularWithAvatar = [
        ...recentPopular.filter(popular => {
          return popular.avatar !== "";
        }),
      ];
      const popularWithDomain = [
        ...recentPopular.filter(popular => {
          return popular.domain !== "";
        }),
      ];
      recentPopular.forEach(popular => {
        mutate([SwrKeys.CYBER_CONNECT_IDENTITY, popular.address], <
          CyberConnectIdentity
        >{ address: popular.address, follwerCount: popular.followerCount });
      });
      popularWithAvatar.forEach(popular => {
        mutate([SwrKeys.ENS_AVATAR, popular.domain], popular.avatar);
      });
      popularWithDomain.forEach(popular => {
        mutate([SwrKeys.ENS, popular.address], popular.domain);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    popular: data?.map(page => {
      return page?.popular?.list;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd: data && !data[data.length - 1]?.popular?.pageInfo?.hasNextPage,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
