import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo } from "react";
import { useProvider } from "wagmi";

import { useIsMounted } from "@lightdotso/app/hooks/useIsMounted";

export const useProviderCyberConnect = () => {
  const isMounted = useIsMounted();
  const provider = useProvider();

  return useMemo<CyberConnect>(() => {
    if (!provider || !isMounted) {
      return;
    }

    return new CyberConnect({
      provider,
      namespace: "Light",
      signingMessageEntity: "Light",
    });
  }, [isMounted, provider]);
};
