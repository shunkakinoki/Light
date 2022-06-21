import { fetchSnapshotVotes } from "@lightdotso/services";
import type { SnapshotVotes } from "@lightdotso/types";
import useSWR from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { LIGHT_API_URL } from "@lightdotso/app/const/api";
import { fetcher } from "@lightdotso/app/libs/services/fetcher";

export const useSnapshotVotes = (address?: string) => {
  const snapshotVotesFetcher = async (key, address) => {
    const result = await fetchSnapshotVotes(address);
    //@ts-expect-error
    if (result.error) {
      const url = `${LIGHT_API_URL}/api/snapshot/votes/${address}`;
      const backupResult = await fetcher(url);
      return backupResult;
    }
    return result;
  };

  const { data, error } = useSWR<SnapshotVotes>(
    address ? [SwrKeys.SNAPSHOT_VOTES, address] : null,
    snapshotVotesFetcher,
  );

  return {
    isLoading: !error && !data,
    isError: !!error,
    snapshot: data?.votes?.filter((vote, index, self) => {
      return (
        index ===
        self.findIndex(t => {
          return t.space.id === vote.space.id;
        })
      );
    }),
  };
};
