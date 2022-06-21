import dynamic from "next/dynamic";

import { Loading } from "@lightdotso/app/components/Loading";
import { Modal } from "@lightdotso/app/components/Modal";
import { useModalWallet } from "@lightdotso/app/hooks/useModalWallet";

const Wallet = dynamic(
  () => {
    return import("@lightdotso/app/components/Wallet").then(mod => {
      return mod.Wallet;
    });
  },
  {
    loading: () => {
      return <Loading />;
    },
  },
);

export const ModalWallet = () => {
  const { modalWalletState, closeModalWallet } = useModalWallet();

  return (
    <Modal show={modalWalletState} onClose={closeModalWallet}>
      <div className="p-6">
        <Wallet onClose={closeModalWallet} />
      </div>
    </Modal>
  );
};
