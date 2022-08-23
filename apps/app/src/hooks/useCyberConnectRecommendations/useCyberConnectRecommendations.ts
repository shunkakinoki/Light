import { safeFetchCyberconnectRecommendations } from "@lightdotso/services";
import type {
  CyberConnectRecommendations,
  CyberConnectIdentity,
} from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type CyberConnectRecommendationsObjectKey = {
  address: string;
  after?: string;
  first?: number;
};

export const useCyberConnectRecommendations = (
  address?: string,
  first?: number,
) => {
  const { mutate } = useSWRConfig();

  const cyberconnectRecommendationsFethcer = async (
    key,
    obj: CyberConnectRecommendationsObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/cyberconnect/recommendations/${obj?.address}?first=${obj?.first}`;

    if (obj?.after) {
      const result = await safeFetchCyberconnectRecommendations(
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

    const result = await safeFetchCyberconnectRecommendations(
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
    previousPageData: CyberConnectRecommendations,
  ) => {
    if (
      (previousPageData && !previousPageData?.recommendations?.data) ||
      !address ||
      !first
    ) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.CYBER_CONNECT_RECOMMENDATIONS,
        <CyberConnectRecommendationsObjectKey>{
          address: address,
          first: first,
        },
      ];
    }

    return [
      SwrKeys.CYBER_CONNECT_RECOMMENDATIONS,
      <CyberConnectRecommendationsObjectKey>{
        address: address,
        first: first,
        after: previousPageData?.recommendations?.data?.pageInfo?.endCursor,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<CyberConnectRecommendations>(
      getKey,
      cyberconnectRecommendationsFethcer,
      {
        initialSize: 1,
        revalidateAll: false,
        revalidateFirstPage: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        persistSize: false,
      },
    );

  useEffect(() => {
    if (data && data[0]?.recommendations?.data?.list) {
      const recommendationPage = data?.map(page => {
        return page?.recommendations?.data?.list;
      });
      const recentRecommendation =
        recommendationPage[recommendationPage.length - 1].flat();
      const recommendationWithAvatar = [
        ...recentRecommendation.filter(recommendation => {
          return recommendation.avatar !== "";
        }),
      ];
      const recommendationWithDomain = [
        ...recentRecommendation.filter(recommendation => {
          return recommendation.domain !== "";
        }),
      ];
      recentRecommendation.forEach(recommendation => {
        mutate([SwrKeys.CYBER_CONNECT_IDENTITY, recommendation.address], <
          CyberConnectIdentity
        >{
          address: recommendation.address,
          follwerCount: recommendation.followerCount,
        });
      });
      recommendationWithAvatar.forEach(recommendation => {
        mutate(
          [SwrKeys.ENS_AVATAR, recommendation.domain],
          recommendation.avatar,
        );
      });
      recommendationWithDomain.forEach(recommendation => {
        mutate([SwrKeys.ENS, recommendation.address], recommendation.domain);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    recommendations: data?.map(page => {
      return page?.recommendations?.data?.list;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd:
      data &&
      !data[data.length - 1]?.recommendations?.data?.pageInfo?.hasNextPage,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
