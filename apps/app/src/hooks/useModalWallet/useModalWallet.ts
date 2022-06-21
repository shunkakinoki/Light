import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { modalWalletAtom } from "@lightdotso/app/atoms/modalWallet";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const useModalWallet = () => {
  const [modalWalletState, setModalWalletState] =
    useRecoilState(modalWalletAtom);

  const { address } = useWallet();

  useEffect(() => {
    if (address) {
      setModalWalletState(false);
    }
  }, [address, setModalWalletState]);

  const openModalWallet = () => {
    setModalWalletState(true);
  };

  const closeModalWallet = () => {
    setModalWalletState(false);
  };

  const toggleModalWallet = () => {
    setModalWalletState(!modalWalletState);
  };

  return {
    modalWalletState,
    openModalWallet,
    closeModalWallet,
    toggleModalWallet,
  } as const;
};
