import { safeFetchPoapEventTokens } from "@lightdotso/services";
import type { PoapEventTokens } from "@lightdotso/types";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type PoapEventsObjectKey = {
  eventId: string;
  offset: number;
  limit?: number;
};

export const usePoapEventTokens = (eventId?: string, limit?: number) => {
  const { mutate } = useSWRConfig();

  const cyberconnectFollowingsFetcher = async (
    key,
    obj: PoapEventsObjectKey,
  ) => {
    const url = `${LIGHT_API_URL}/api/poap/event/tokens/${
      obj?.eventId
    }?offset=${obj?.offset}${limit && `&limit=${limit}`}`;

    if (obj?.offset) {
      const result = await safeFetchPoapEventTokens(
        obj?.eventId,
        obj?.offset,
        obj?.limit,
      )();
      if (result.isErr()) {
        const backupResult = await fetcher(url);
        return backupResult;
      }
      return result.value;
    }

    const result = await safeFetchPoapEventTokens(
      obj?.eventId,
      obj?.offset,
      obj?.limit,
    )();
    if (result.isErr()) {
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result.value;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: PoapEventTokens,
  ) => {
    if ((previousPageData && !previousPageData?.tokens) || !eventId || !limit) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.POAP_EVENT_TOKENS,
        <PoapEventsObjectKey>{ eventId: eventId, offset: 0, limit: limit },
      ];
    }

    return [
      SwrKeys.POAP_EVENT_TOKENS,
      <PoapEventsObjectKey>{
        eventId: eventId,
        offset: previousPageData?.offset + limit,
        limit: limit,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<PoapEventTokens>(getKey, cyberconnectFollowingsFetcher);

  useEffect(() => {
    if (data && data[0]?.tokens) {
      const tokensPage = data?.map(page => {
        return page?.tokens;
      });
      const recentTokens = tokensPage[tokensPage.length - 1].flat();

      const tokensWithDomain = [
        ...recentTokens.filter(token => {
          return token.owner?.ens !== "";
        }),
      ];

      tokensWithDomain.forEach(followings => {
        mutate([SwrKeys.ENS, followings.owner?.id], followings.owner?.ens);
      });
    }
  }, [data, mutate]);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    tokens: data?.map(page => {
      return page?.tokens;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd:
      data &&
      data[data.length - 1]?.offset + (limit || 10) >
        data[data.length - 1]?.total,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    total: data && data[data.length - 1]?.total,
    setSize: setSize,
  };
};
