import clsx from "clsx";

import { Drawer } from "@lightdotso/app/components/Drawer";
import { useModalAsset } from "@lightdotso/app/hooks/useModalAsset";

export const ModalAsset = () => {
  const { modalAssetState, closeModalAsset, setModalAssetState } =
    useModalAsset();

  return (
    <Drawer show={modalAssetState?.open} onClose={closeModalAsset}>
      <div className="max-h-[calc(100vh-150px)] w-full max-w-[calc(100vw-10px)]">
        <div className="block w-[9999px]" />
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
    </Drawer>
  );
};
