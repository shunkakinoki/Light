import clsx from "clsx";

import { Drawer } from "@lightdotso/app/components/Drawer";
import { useDrawerAsset } from "@lightdotso/app/hooks/useDrawerAsset";

export const DrawerAsset = () => {
  const { drawerAssetState, closeDrawerAsset, setDrawerAssetState } =
    useDrawerAsset();

  return (
    <Drawer show={drawerAssetState?.open} onClose={closeDrawerAsset}>
      <div className="max-h-[calc(100vh-150px)] w-full max-w-[calc(100vw-10px)]">
        <div className="block w-[9999px]" />
        <div className="h-[calc(100vh-150px)]">
          <iframe
            className={clsx(
              "h-full w-full bg-bg",
              !drawerAssetState.show ? "hidden opacity-0" : "visible",
            )}
            src={drawerAssetState.src}
            title={drawerAssetState.src}
            onLoad={() => {
              setTimeout(() => {
                return setDrawerAssetState({
                  ...drawerAssetState,
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
