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
    if (drawerAssetState.open) {
      router.push(`${router.asPath}?as=${drawerAssetState.url}`, undefined, {
        shallow: true,
      });
    }

    if (drawerAssetState.type && !drawerAssetState.open) {
      router.push(`${router.asPath.split("?as=")[0]}`, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerAssetState.open]);

  return {
    drawerAssetState,
    setDrawerAssetState,
    closeDrawerAsset,
  } as const;
};
