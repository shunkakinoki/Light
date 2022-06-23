import { FollowCardBanner } from "@lightdotso/app/components/FollowCardBanner";
import { Modal } from "@lightdotso/app/components/Modal";
import { ModalClose } from "@lightdotso/app/components/ModalClose";
import { ModalNetworkList } from "@lightdotso/app/components/ModalNetworkList";
import { ModalNetworkTabs } from "@lightdotso/app/components/ModalNetworkTabs";
import { useModalNetwork } from "@lightdotso/app/hooks/useModalNetwork";

export const ModalNetwork = () => {
  const { modalNetworkState, closeModalNetwork } = useModalNetwork();

  return (
    <Modal show={modalNetworkState.open} onClose={closeModalNetwork}>
      <div className="p-6 max-w-sm sm:max-w-lg md:max-w-xl bg-bg">
        <div className="block w-[9999px]" />
        <ModalClose onClick={closeModalNetwork} />
        <FollowCardBanner address={modalNetworkState.address} />
        <ModalNetworkTabs />
        <ModalNetworkList address={modalNetworkState.address} />
        <div className="mt-4">
          <p className="text-sm text-contrast-medium">
            Please select one of the &quot;networks&quot; above to view the
            person&apos;s DAOs, NFT Collections, or POAPs they may have
            attended.
          </p>
        </div>
      </div>
    </Modal>
  );
};
