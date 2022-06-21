import CyberConnect from "@cyberlab/cyberconnect";
import { useMemo } from "react";
import { useContext } from "wagmi";

export const useProviderCyberConnectDefault = () => {
  const context = useContext();

  return useMemo<CyberConnect>(() => {
    if (!context.state.connector) {
      return;
    }

    const provider = context.state.connector?.getProvider();

    return new CyberConnect({
      provider,
      namespace: "CyberConnect",
      signingMessageEntity: "Light",
    });
  }, [context.state.connector]);
};
