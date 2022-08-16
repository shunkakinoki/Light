import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { useAccount } from "wagmi";

import { useIsFirst } from "@lightdotso/app/hooks/useIsFirst";
import { useSession } from "@lightdotso/app/hooks/useSession";
import { error } from "@lightdotso/app/libs/toast/error";
import { warning } from "@lightdotso/app/libs/toast/warning";
import { eraseCookie } from "@lightdotso/app/utils/eraseCookie";

export const useWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { setIsFirst } = useIsFirst();
  const { mutate: mutateSession } = useSession();

  const disconnect = useCallback(async () => {
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
  }, [mutateSession, setIsFirst]);

  return {
    isConnecting: isConnecting,
    isDisconnected: isDisconnected,
    address: address,
    disconnect: disconnect,
  };
};
