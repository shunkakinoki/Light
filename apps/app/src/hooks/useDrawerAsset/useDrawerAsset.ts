import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { drawerAssetAtom } from "@lightdotso/app/atoms/drawerAsset";

export const useDrawerAsset = () => {
  const [drawerAssetState, setDrawerAssetState] =
    useRecoilState(drawerAssetAtom);
  const router = useRouter();

  const closeDrawerAsset = useCallback(() => {
    setDrawerAssetState({
      ...drawerAssetState,
      open: false,
    });
  }, [drawerAssetState, setDrawerAssetState]);

  useEffect(() => {
    router.events.on("routeChangeComplete", closeDrawerAsset);
    return () => {
      router.events.off("routeChangeComplete", closeDrawerAsset);
    };
  }, [closeDrawerAsset, router.events]);

  return {
    drawerAssetState,
    setDrawerAssetState,
    closeDrawerAsset,
  } as const;
};
