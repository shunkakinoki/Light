import useSWR from "swr";
import { useEnsAvatar as useWagmiEnsAvatar } from "wagmi";

import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const useEnsAvatar = (ens?: string) => {
  const [, getEnsAvatar] = useWagmiEnsAvatar();

  const fetchEns = async (key, ens) => {
    const result = await getEnsAvatar({ addressOrName: ens });
    if (typeof result === "string") {
      return result;
    }
    return null;
  };

  const {
    data: avatar,
    error,
    mutate,
  } = useSWR(ens ? [SwrKeys.ENS_AVATAR, ens] : null, fetchEns);

  return {
    isLoading: !error && !avatar,
    isError: !!error,
    avatar: avatar,
    mutate: mutate,
  };
};
