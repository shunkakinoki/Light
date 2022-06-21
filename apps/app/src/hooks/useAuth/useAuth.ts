/* eslint-disable no-empty */

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useCallback, useState } from "react";
import { SiweMessage } from "siwe";
import { useNetwork, useSignMessage } from "wagmi";

import { useEns } from "@lightdotso/app/hooks/useEns";
import { useIsFirst } from "@lightdotso/app/hooks/useIsFirst";
import { useIsMounted } from "@lightdotso/app/hooks/useIsMounted";
import { useSession } from "@lightdotso/app/hooks/useSession";
import { useWallet } from "@lightdotso/app/hooks/useWallet";
import { success } from "@lightdotso/app/libs/toast/sucess";

export const useAuth = (guard?: boolean) => {
  const { address, disconnect } = useWallet();
  const router = useRouter();
  const { isFallback } = useRouter();
  const [{ data: networkData }] = useNetwork();
  const isMounted = useIsMounted();
  const { isFirst, setIsFirst } = useIsFirst();
  const [isOnly, setIsOnly] = useState(true);
  const { session, mutate: mutateSession } = useSession();
  const { ens } = useEns(session?.address);

  const [, signMessage] = useSignMessage();

  const signInWithEthereum = useCallback(async () => {
    setIsOnly(false);

    const chainId = networkData?.chain?.id;
    if (!address || !chainId || !isMounted) {
      return;
    }

    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to Light",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({ message: message.prepareMessage() });
      if (signRes.error) {
        throw signRes.error;
      }

      await signIn("web3", {
        address: address,
        message: JSON.stringify(message),
        signature: signRes.data,
        redirect: false,
      });

      mutateSession({ address: address }, false);
      mutateSession();
      setIsOnly(true);
    } catch (err) {
      mutateSession(null, false);
      disconnect();
      mutateSession(null);
      setIsOnly(true);
      return;
    }
    if (router.asPath === "/auth") {
      router.push("/");
    }
  }, [
    address,
    disconnect,
    isMounted,
    mutateSession,
    networkData?.chain?.id,
    router,
    signMessage,
  ]);

  useEffect(() => {
    mutateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (address && session && isFirst && !isFallback) {
      success(`Logged in as ${ens ?? session?.address}`);
      setIsFirst(false);
    }

    if (!address && !session && guard) {
      router.replace("/auth");
    }

    if (address && !session && isOnly && typeof session !== "undefined") {
      (async () => {
        return await signInWithEthereum();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, session, isFirst, setIsFirst, isOnly]);
};
