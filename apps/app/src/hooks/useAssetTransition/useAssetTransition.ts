import { useRouter } from "next/router";
import { useRef } from "react";
import { useRecoilState } from "recoil";

import { assetTransitionAtom } from "@lightdotso/app/atoms/assetTransition";
import { isPreview } from "@lightdotso/app/utils/isPreview";
import { isProduction } from "@lightdotso/app/utils/isProduction";

export const useAssetTransition = () => {
  const [assetTransitionState, setAssetTransitionState] =
    useRecoilState(assetTransitionAtom);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const startAssetTransition = () => {
    setAssetTransitionState(true);
  };

  const finishAssetTransition = () => {
    setAssetTransitionState(false);
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const referrer = document.referrer;
      let isLightReferrer: boolean = false;

      if (isProduction) {
        if (referrer.startsWith("https://light.so")) {
          isLightReferrer = true;
        }
      } else if (isPreview) {
        if (referrer.includes("vercel.app")) {
          isLightReferrer = true;
        }
      } else {
        if (referrer.startsWith("http://localhost:3000")) {
          isLightReferrer = true;
        }
      }

      if (isLightReferrer) {
        return router.back();
      }

      timeoutRef.current = null;
      return router.push("/");
    }, 120);
  };

  const toggleAssetTransition = () => {
    setAssetTransitionState(!assetTransitionState);
  };

  return {
    assetTransitionState,
    startAssetTransition,
    finishAssetTransition,
    toggleAssetTransition,
  } as const;
};
