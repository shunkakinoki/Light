import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { useDisconnect, useAccount } from "wagmi";

import { useIsFirst } from "@lightdotso/app/hooks/useIsFirst";
import { useSession } from "@lightdotso/app/hooks/useSession";
import { error } from "@lightdotso/app/libs/toast/error";
import { warning } from "@lightdotso/app/libs/toast/warning";
import { eraseCookie } from "@lightdotso/app/utils/eraseCookie";

export const useWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setIsFirst } = useIsFirst();
  const { mutate: mutateSession } = useSession();

  const walletDisconnect = useCallback(async () => {
    disconnect();
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
  }, [disconnect, mutateSession, setIsFirst]);

  return {
    address: address,
    isConnecting: isConnecting,
    isDisconnected: isDisconnected,
    disconnect: walletDisconnect,
  };
};
