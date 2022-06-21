import { providers } from "ethers";
import { useMemo } from "react";
import { chain } from "wagmi";

import { isChainSupported } from "@lightdotso/app/utils/isChainSupported";

export const useProviderWeb3 = (chainId?: number): providers.InfuraProvider => {
  return useMemo<providers.InfuraProvider>(() => {
    return new providers.InfuraProvider(
      isChainSupported(chainId) ? chainId : chain.mainnet.id,
      {
        projectId: process.env.NEXT_PUBLIC_INFURA_ID as string,
      },
    );
  }, [chainId]);
};
