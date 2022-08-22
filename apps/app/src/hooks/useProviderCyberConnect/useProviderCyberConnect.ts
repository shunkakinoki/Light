import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useProviderCyberConnect = () => {
  const { connector } = useAccount();
  const [provider, setProvider] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      setProvider(await connector?.getProvider());
    };
    loadProvider();
  }, [connector]);

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
