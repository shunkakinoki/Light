import { safeFetchCyberconnectRankings } from "@lightdotso/services";
import type {
  CyberConnectRankings,
  CyberConnectIdentity,
} from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type CyberConnectRankingsObjectKey = {
  address: string;
  after?: string;
  first?: number;
};

export const useCyberConnectRankings = (address?: string, first?: number) => {
  const { mutate } = useSWRConfig();

  const cyberconnectRankingsFethcer = async (
    key,
    obj: CyberConnectRankingsObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/cyberconnect/rankings?first=${obj?.first}`;

    if (obj?.after) {
      const result = await safeFetchCyberconnectRankings(
        obj?.first,
        obj?.after,
      )();
      if (result.isErr()) {
        const backupResult = await fetcher(`${url}&after=${obj?.after}`);
        return backupResult;
      }
      return result.value;
    }

    const result = await safeFetchCyberconnectRankings(obj?.first)();
    if (result.isErr()) {
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: CyberConnectRankings,
  ) => {
    if (
      (previousPageData && !previousPageData?.rankings) ||
      !address ||
      !first
    ) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.CYBER_CONNECT_RANKINGS,
        <CyberConnectRankingsObjectKey>{ first: first },
      ];
    }

    return [
      SwrKeys.CYBER_CONNECT_RANKINGS,
      <CyberConnectRankingsObjectKey>{
        after: previousPageData?.rankings?.pageInfo?.endCursor,
        first: first,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<CyberConnectRankings>(getKey, cyberconnectRankingsFethcer, {
      initialSize: 1,
      revalidateAll: false,
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      persistSize: false,
    });

  useEffect(() => {
    if (data && data[0]?.rankings?.list) {
      const rankingPage = data?.map(page => {
        return page?.rankings?.list;
      });
      const recentRanking = rankingPage[rankingPage.length - 1].flat();
      const rankingWithAvatar = [
        ...recentRanking.filter(ranking => {
          return ranking.avatar !== "";
        }),
      ];
      const rankingWithDomain = [
        ...recentRanking.filter(ranking => {
          return ranking.domain !== "";
        }),
      ];
      recentRanking.forEach(ranking => {
        mutate([SwrKeys.CYBER_CONNECT_IDENTITY, ranking.address], <
          CyberConnectIdentity
        >{
          address: ranking.address,
          follwerCount: ranking.followerCount,
        });
      });
      rankingWithAvatar.forEach(ranking => {
        mutate([SwrKeys.ENS_AVATAR, ranking.domain], ranking.avatar);
      });
      rankingWithDomain.forEach(ranking => {
        mutate([SwrKeys.ENS, ranking.address], ranking.domain);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    rankings: data?.map(page => {
      return page?.rankings?.list;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd: data && !data[data.length - 1]?.rankings?.pageInfo?.hasNextPage,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
