import { defaultChains } from "wagmi";

export const isChainSupported = (chainId?: number) => {
  return defaultChains.some(x => {
    return x.id === chainId;
  });
};
