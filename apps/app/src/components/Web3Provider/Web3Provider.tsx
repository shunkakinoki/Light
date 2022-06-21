import type { FC } from "react";
import {
  Provider,
  chain,
  defaultChains,
  defaultL2Chains,
  developmentChains,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

import { useProviderWeb3 } from "@lightdotso/app/hooks/useProviderWeb3";
import { useProviderWebSocket } from "@lightdotso/app/hooks/useProviderWebSocket";

const chains = [...defaultChains, ...defaultL2Chains, ...developmentChains];

type Config = { chainId?: number };
const connectors = ({ chainId }: Config) => {
  const rpcUrl =
    chains.find(x => {
      return x.id === chainId;
    })?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "light.so",
        jsonRpcUrl: `${rpcUrl}/${process.env.NEXT_PUBLIC_INFURA_ID as string}`,
      },
    }),
  ];
};

export const Web3Provider: FC = ({ children }) => {
  const provider = useProviderWeb3();
  const webSocketProvider = useProviderWebSocket();

  return (
    <Provider
      autoConnect
      connectorStorageKey="light.so"
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      {children}
    </Provider>
  );
};
