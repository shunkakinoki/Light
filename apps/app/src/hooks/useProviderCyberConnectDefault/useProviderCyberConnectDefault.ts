import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo } from "react";
import { useProvider } from "wagmi";

export const useProviderCyberConnect = () => {
  const provider = useProvider();

  return useMemo<CyberConnect>(() => {
    if (!provider) {
      return;
    }

    return new CyberConnect({
      provider: provider,
      namespace: "CyberConnect",
      signingMessageEntity: "Light",
    });
  }, [provider]);
};
