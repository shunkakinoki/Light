import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo } from "react";

import { useProvider } from "@lightdotso/app/hooks/useProvider";

export const useProviderCyberConnect = () => {
  const provider = useProvider();

  return useMemo<CyberConnect>(() => {
    if (provider) {
      return new CyberConnect({
        provider: provider,
        namespace: "Light",
        signingMessageEntity: "Light",
      });
    }
  }, [provider]);
};
