import { fetchSnapshotVoters } from "@lightdotso/services";
import type { SnapshotVoters } from "@lightdotso/types";
import useSWRInfinite from "swr/infinite";
import type { SWRInfiniteKeyLoader } from "swr/infinite";

import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

type SnapshotVotersObjectKey = {
  spaceId: string;
  first?: number;
  skip?: number;
};

export const useSnapshotVoters = (spaceId?: string, first?: number) => {
  const snapshotVotersFethcer = async (key, obj: SnapshotVotersObjectKey) => {
    const url = `${LIGHT_API_URL}/api/snapshot/followers/${obj?.spaceId}?first=${obj?.first}`;

    if (obj?.skip) {
      const result = await fetchSnapshotVoters(
        obj?.spaceId,
        obj?.first,
        obj?.skip,
      );
      //@ts-expect-error
      if (result.error) {
        const backupResult = await fetcher(`${url}&skip=${obj?.skip}`);
        return backupResult;
      }
      return result;
    }

    const result = await fetchSnapshotVoters(obj?.spaceId, obj?.first);
    //@ts-expect-error
    if (result.error) {
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result;
  };

  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: SnapshotVoters,
  ) => {
    if ((previousPageData && !previousPageData?.votes) || !spaceId || !first) {
      return null;
    }

    if (pageIndex === 0) {
      return [
        SwrKeys.SNAPSHOT_VOTERS,
        <SnapshotVotersObjectKey>{ spaceId: spaceId, first: first, skip: 0 },
      ];
    }

    return [
      SwrKeys.SNAPSHOT_VOTERS,
      <SnapshotVotersObjectKey>{
        spaceId: spaceId,
        first: first,
        skip: pageIndex * NETWORK_PEOPLE_QUERY_NUMBER,
      },
    ];
  };

  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<SnapshotVoters>(getKey, snapshotVotersFethcer);

  const isLoadingInitial = !data && !error;

  return {
    isLoading: !error && !data,
    isError: !!error,
    voters: data?.map(page => {
      return page?.votes;
    }),
    isLoadingInitial: isLoadingInitial,
    isLoadingMore:
      isLoadingInitial ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isEmpty: data?.length === 0,
    isEnd: data && !data[data.length - 1]?.votes,
    isRefreshing: isValidating && data && data?.length === size,
    size: size,
    setSize: setSize,
  };
};
