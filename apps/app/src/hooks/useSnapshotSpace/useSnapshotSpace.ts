import { fetchSnapshotSpace } from "@lightdotso/services";
import type { SnapshotSpace } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useSnapshotSpace = (address?: string) => {
  const snapshotSpaceFetcher = async (key, address) => {
    const result = await fetchSnapshotSpace(address);
    //@ts-expect-error
    if (result.error) {
      const url = `${LIGHT_API_URL}/api/snapshot/space/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result;
  };

  const { data, error } = useSWR<SnapshotSpace>(
    address ? [SwrKeys.SNAPSHOT_SPACE, address] : null,
    snapshotSpaceFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    space: data?.space,
  };
};
