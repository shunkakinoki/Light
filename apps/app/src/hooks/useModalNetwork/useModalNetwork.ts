import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { modalNetworkAtom } from "@lightdotso/app/atoms/modalNetwork";

export const useModalNetwork = () => {
  const [modalNetworkState, setModalNetworkState] =
    useRecoilState(modalNetworkAtom);
  const router = useRouter();

  const closeModalNetwork = useCallback(() => {
    setModalNetworkState({
      ...modalNetworkState,
      open: false,
    });
  }, [modalNetworkState, setModalNetworkState]);

  useEffect(() => {
    router.events.on("routeChangeComplete", closeModalNetwork);
    return () => {
      router.events.off("routeChangeComplete", closeModalNetwork);
    };
  }, [closeModalNetwork, router.events]);

  return {
    modalNetworkState,
    setModalNetworkState,
    closeModalNetwork,
  } as const;
};
