import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo, useEffect, useState } from "react";
import { useConnect } from "wagmi";

export const useProviderCyberConnect = () => {
  const { connectors } = useConnect();
  const [provider, setProvider] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      setProvider(await connectors[0].getProvider());
    };
    loadProvider();
  }, [connectors]);

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
