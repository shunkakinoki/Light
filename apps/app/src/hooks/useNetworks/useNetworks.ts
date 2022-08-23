import {
  safeFetchNetworksRaw,
  safeFetchPoapActions,
  safeFetchSnapshotVotes,
} from "@lightdotso/services";
import type { Network, NetworkRaw } from "@lightdotso/types";
import { useEffect, useMemo } from "react";

import useSWR, { useSWRConfig } from "swr";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { useNetworkType } from "@lightdotso/app/hooks/useNetworkType";

export const useNetworks = (address: string) => {
  const { networkType } = useNetworkType();
  const { mutate } = useSWRConfig();

  const networkFetcher = async (key, address) => {
    const result = await safeFetchNetworksRaw(address)();
    if (result.isErr()) {
      const [actions, votes] = await Promise.all([
        safeFetchPoapActions(address)(),
        safeFetchSnapshotVotes(address)(),
      ]);
      return {
        poap: actions.unwrapOr(null),
        snapshot: { data: votes.unwrapOr(null) },
      };
    }
    return result.value;
  };

  const { data, error } = useSWR<NetworkRaw>(
    address ? [SwrKeys.NETWORKS_RAW, address] : null,
    networkFetcher,
  );

  const networks = useMemo(() => {
    let result: Network[] = [];
    if (!data) {
      return;
    }

    if (data?.snapshot && data.snapshot.data?.votes && networkType !== "POAP") {
      result = result.concat(
        data?.snapshot?.data?.votes
          ?.filter((vote, index, self) => {
            return (
              index ===
              self.findIndex(t => {
                return t.space.id === vote.space.id;
              })
            );
          })
          .map(shot => {
            return {
              src: shot.space.avatar,
              name: shot.space.name,
              id: shot.space.id,
              count: shot.space.followersCount,
              type: "DAO",
            } as Network;
          }),
      );
    }

    if (data?.poap && data?.poap.length > 0 && networkType !== "DAO") {
      result = result.concat(
        data.poap.map(poap => {
          return {
            src: poap.event.image_url,
            name: poap.event.name,
            id: poap.event.id.toString() || "0",
            count: poap.event.supply,
            type: "POAP",
          } as Network;
        }),
      );
    }

    return result;
  }, [data, networkType]);

  useEffect(() => {
    if (data?.poap) {
      mutate([SwrKeys.POAP_ACTIONS, address], data.poap, false);
      if (data?.poap) {
        mutate([SwrKeys.SNAPSHOT_VOTES, address], data.snapshot, false);
      }
    }
  }, [address, data, mutate]);

  return { networks: networks, isLoading: !error && !data };
};
