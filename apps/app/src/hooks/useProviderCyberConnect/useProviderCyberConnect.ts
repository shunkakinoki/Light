import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo, useEffect, useState } from "react";
import { useProvider } from "wagmi";

export const useProviderCyberConnect = () => {
  const provider = useProvider();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return useMemo<CyberConnect>(() => {
    if (!provider || !isClient) {
      return;
    }

    return new CyberConnect({
      provider: provider,
      namespace: "Light",
      signingMessageEntity: "Light",
    });
  }, [isClient, provider]);
};
