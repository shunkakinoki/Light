import { providers } from "ethers";
import { useMemo } from "react";

export const useProviderWebSocket = (
  chainId?: number,
): providers.InfuraWebSocketProvider => {
  return useMemo<providers.InfuraWebSocketProvider>(() => {
    return new providers.InfuraWebSocketProvider(
      chainId,
      process.env.NEXT_PUBLIC_INFURA_ID as string,
    );
  }, [chainId]);
};
