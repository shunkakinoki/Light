import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { modalTwitterVerifyAtom } from "@lightdotso/app/atoms/modalTwitterVerify";

export const useModalTwitterVerify = () => {
  const [modalTwitterVerifyState, setModalTwitterVerifyState] = useRecoilState(
    modalTwitterVerifyAtom,
  );
  const router = useRouter();

  const closeModalTwitterVerify = useCallback(() => {
    setModalTwitterVerifyState({
      ...modalTwitterVerifyState,
      open: false,
    });
  }, [modalTwitterVerifyState, setModalTwitterVerifyState]);

  useEffect(() => {
    router.events.on("routeChangeComplete", closeModalTwitterVerify);
    return () => {
      router.events.off("routeChangeComplete", closeModalTwitterVerify);
    };
  }, [closeModalTwitterVerify, router.events]);

  return {
    modalTwitterVerifyState,
    setModalTwitterVerifyState,
    closeModalTwitterVerify,
  } as const;
};
