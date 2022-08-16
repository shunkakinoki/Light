import type { FC } from "react";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  defaultChains,
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
  { targetQuorum: 1, minQuorum: 1 },
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "light",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const Web3Provider: FC = ({ children }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
