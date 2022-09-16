import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { useDisconnect, useAccount } from "wagmi";

import { useIsFirst } from "@lightdotso/app/hooks/useIsFirst";
import { error } from "@lightdotso/app/libs/toast/error";
import { warning } from "@lightdotso/app/libs/toast/warning";
import { eraseCookie } from "@lightdotso/app/utils/eraseCookie";

export const useWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setIsFirst } = useIsFirst();

  const walletDisconnect = useCallback(async () => {
    disconnect();
    try {
      signOut({ redirect: false });
      warning("Logged out!");
    } catch (err) {
      error(err.message);
      return;
    }
    setIsFirst(true);
    eraseCookie("__Host-next-auth.csrf-token");
    eraseCookie("__Secure-next-auth.callback-url");
    eraseCookie("__Secure-next-auth.session-token");
    eraseCookie("next-auth.csrf-token");
  }, [disconnect, setIsFirst]);

  return {
    address: address,
    isConnecting: isConnecting,
    isDisconnected: isDisconnected,
    disconnect: walletDisconnect,
  };
};
