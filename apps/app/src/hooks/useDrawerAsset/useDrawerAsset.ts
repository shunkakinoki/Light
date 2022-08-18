import { useRecoilState } from "recoil";

import { drawerAssetAtom } from "@lightdotso/app/atoms/drawerAsset";

export const useDrawerAsset = () => {
  const [drawerAssetState, setDrawerAssetState] =
    useRecoilState(drawerAssetAtom);

  const closeDrawerAsset = () => {
    setDrawerAssetState({
      ...drawerAssetState,
      open: false,
    });
  };

  return {
    drawerAssetState,
    setDrawerAssetState,
    closeDrawerAsset,
  } as const;
};
