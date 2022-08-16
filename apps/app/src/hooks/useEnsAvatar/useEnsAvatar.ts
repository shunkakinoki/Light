import useSWR from "swr";
import { useEnsAvatar as useEnsAvatarWagmi } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsAvatar = (ens?: string) => {
  const { data, isError, isLoading } = useEnsAvatarWagmi({
    addressOrName: ens,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEns = async (key, ens) => {
    if (typeof data === "string") {
      return data;
    }
    return null;
  };

  const { data: avatar, mutate } = useSWR(
    ens ? [SwrKeys.ENS_AVATAR, ens] : null,
    fetchEns,
  );

  return {
    isLoading: isLoading,
    isError: isError,
    avatar: avatar,
    mutate: mutate,
  };
};
