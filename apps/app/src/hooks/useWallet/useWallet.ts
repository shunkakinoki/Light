import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { useContext } from "wagmi";

import { useIsFirst } from "@lightdotso/app/hooks/useIsFirst";
import { useSession } from "@lightdotso/app/hooks/useSession";
import { error } from "@lightdotso/app/libs/toast/error";
import { warning } from "@lightdotso/app/libs/toast/warning";
import { eraseCookie } from "@lightdotso/app/utils/eraseCookie";

export const useWallet = () => {
  const { state: globalState, setState } = useContext();
  const { setIsFirst } = useIsFirst();
  const { mutate: mutateSession } = useSession();

  const disconnect = useCallback(async () => {
    setState(x => {
      x.connector?.disconnect();
      return { cacheBuster: x.cacheBuster + 1 };
    });
    mutateSession(null, false);
    try {
      signOut({ redirect: false });
      warning("Logged out!");
    } catch (err) {
      error(err.message);
      return;
    }
    setIsFirst(true);
    // mutateSession(null);
    eraseCookie("__Host-next-auth.csrf-token");
    eraseCookie("next-auth.csrf-token");
  }, [mutateSession, setIsFirst, setState]);

  return {
    isLoading: !globalState.data?.account,
    isConnected: !!globalState.data?.account,
    address: globalState.data?.account ?? null,
    disconnect: disconnect,
  };
};
