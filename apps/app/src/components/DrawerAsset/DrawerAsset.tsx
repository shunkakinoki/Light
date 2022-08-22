import dynamic from "next/dynamic";

import { Drawer } from "@lightdotso/app/components/Drawer";
import { useDrawerAsset } from "@lightdotso/app/hooks/useDrawerAsset";

const AssetNFT = dynamic(
  () => {
    return import("@lightdotso/app/components/AssetNFT").then(mod => {
      return mod.AssetNFT;
    });
  },
  { ssr: false },
);

const AssetPoap = dynamic(
  () => {
    return import("@lightdotso/app/components/AssetPoap").then(mod => {
      return mod.AssetPoap;
    });
  },
  { ssr: false },
);

const AssetOAT = dynamic(
  () => {
    return import("@lightdotso/app/components/AssetOAT").then(mod => {
      return mod.AssetOAT;
    });
  },
  { ssr: false },
);

export const DrawerAsset = () => {
  const { drawerAssetState, closeDrawerAsset } = useDrawerAsset();

  return (
    <Drawer show={drawerAssetState?.open} onClose={closeDrawerAsset}>
      <div className="w-full max-w-full overflow-y-scroll">
        {drawerAssetState?.type === "NFT" && (
          <AssetNFT
            address={drawerAssetState?.address}
            tokenId={drawerAssetState?.id}
          />
        )}
        {drawerAssetState?.type === "POAP" && (
          <AssetPoap tokenId={drawerAssetState?.id} />
        )}
        {drawerAssetState?.type === "OAT" && (
          <AssetOAT oatId={drawerAssetState?.id} />
        )}
      </div>
    </Drawer>
  );
};
