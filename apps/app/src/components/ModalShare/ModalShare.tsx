import { Modal } from "@lightdotso/app/components/Modal";
import { ModalShareButton } from "@lightdotso/app/components/ModalShareButton";
import { ModalShareImage } from "@lightdotso/app/components/ModalShareImage";
import { useModalShare } from "@lightdotso/app/hooks/useModalShare";

export const ModalShare = () => {
  const { modalShareState, closeModalShare } = useModalShare();

  return (
    <Modal show={modalShareState?.open} onClose={closeModalShare}>
      <div className="max-w-sm p-3 sm:max-w-lg">
        <div className="block w-[9999px]" />
        <ModalShareImage
          address={modalShareState?.address}
          name={modalShareState?.name}
        />
        <ModalShareButton
          address={modalShareState?.address}
          name={modalShareState?.name}
          type={modalShareState?.type}
        />
      </div>
    </Modal>
  );
};
