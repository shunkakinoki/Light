import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import { useIsMounted } from "@lightdotso/app/hooks/useIsMounted";

export const useAuth = (guard: boolean) => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { status } = useSession();
  const [checkAuth, setCheckAuth] = useState(false);
  const isMounted = useIsMounted();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && !checkAuth && isConnected) {
      setCheckAuth(true);
      if (status === "unauthenticated") {
        disconnect();
        signOut({ redirect: false });
      }
    }
  }, [isMounted, checkAuth, isConnected, status, disconnect]);

  useEffect(() => {
    if (guard && isConnected && status === "unauthenticated") {
      router.replace("/auth");
    }
  });
};
