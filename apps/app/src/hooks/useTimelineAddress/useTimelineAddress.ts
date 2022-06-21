import type { TimelineData } from "@lightdotso/types";
import type { CategoryType } from "@prisma/client";
import type { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";

import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type TimelineAddressObjectKey = {
  address: string;
  category?: CategoryType;
  cursor?: string;
};

export const useTimelineAddress = (
  address?: string,
  category?: CategoryType,
  cursor?: string,
) => {
  const timelineAddressFetcher = async (key, obj: TimelineAddressObjectKey) => {
    const url = `${LIGHT_API_URL}/api/timeline/${obj?.address}`;

    if (obj?.category && obj.cursor) {
      const result = await fetcher(
        `${url}?category=${obj?.category}&cursor=${obj?.cursor}`,
      );
      return result;
    }

    if (obj?.category) {
      const result = await fetcher(`${url}?category=${obj?.category}`);
      return result;
    }

    if (obj?.cursor) {
      const result = await fetcher(`${url}?cursor=${obj?.cursor}`);
      return result;
    }

    const result = await fetcher(url);

    return result;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: TimelineData,
  ) => {
    if ((previousPageData && !previousPageData?.timeline) || !address) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.TIMELINE_ADDRESS,
        <TimelineAddressObjectKey>{
          address: address,
          category: category,
          cursor: cursor,
        },
      ];
    }

    return [
      SwrKeys.TIMELINE_ADDRESS,
      <TimelineAddressObjectKey>{
        address: address,
        category: category,
        cursor: previousPageData?.cursor,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<TimelineData>(getKey, timelineAddressFetcher);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    timeline:
      data && data[0]?.timeline !== null
        ? data?.map(page => {
            return page?.timeline;
          })
        : null,
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd: data && data[data.length - 1]?.isEnd,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
