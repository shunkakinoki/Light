import clsx from "clsx";

import { Modal } from "@lightdotso/app/components/Modal";
import { ModalAssetButton } from "@lightdotso/app/components/ModalAssetButton";
import { ModalCloseButton } from "@lightdotso/app/components/ModalCloseButton";
import { useModalAsset } from "@lightdotso/app/hooks/useModalAsset";

export const ModalAsset = () => {
  const { modalAssetState, closeModalAsset, setModalAssetState } =
    useModalAsset();

  return (
    <Modal show={modalAssetState?.open} onClose={closeModalAsset}>
      <div className="max-h-[calc(100vh-150px)] w-full max-w-[calc(100vw-10px)] md:max-w-6xl">
        <div className="block w-[9999px]" />
        <div className="flex w-full items-center justify-between p-8">
          <ModalCloseButton
            onClick={() => {
              return setModalAssetState({
                ...modalAssetState,
                open: false,
              });
            }}
          />
          <ModalAssetButton src={modalAssetState.src} />
        </div>
        <div className="h-[calc(100vh-150px)]">
          <iframe
            className={clsx(
              "h-full w-full bg-bg",
              !modalAssetState.show ? "hidden opacity-0" : "visible",
            )}
            src={modalAssetState.src}
            title={modalAssetState.src}
            onLoad={() => {
              setTimeout(() => {
                return setModalAssetState({
                  ...modalAssetState,
                  show: true,
                });
              }, 300);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
