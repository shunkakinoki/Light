import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import type { GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { FC } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ],
  { targetQuorum: 1, minQuorum: 1 },
);

const { wallets } = getDefaultWallets({
  appName: "Light",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => {
  return {
    statement: "Sign in to the Light",
  };
};

export type Web3ProviderProps = { session: Session | null | undefined };

export const Web3Provider: FC<Web3ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider refetchInterval={0} session={session}>
      <WagmiConfig client={client}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider
            appInfo={{ appName: "Light" }}
            chains={chains}
            theme={{
              lightMode: lightTheme(),
              darkMode: darkTheme(),
            }}
          >
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};
