import { useConnectModal } from "@rainbow-me/rainbowkit";

export const useModalWallet = () => {
  const { openConnectModal: openModalWallet } = useConnectModal();

  return {
    openModalWallet,
  } as const;
};
