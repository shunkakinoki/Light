import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import type { FC } from "react";

import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";

export const HeaderPillConnect: FC = () => {
  return (
    <div className="group relative">
      <PlaceholderBlur />
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      className="relative flex items-center rounded-full border border-contrast-high bg-contrast-higher py-2 px-3 text-sm leading-none ring-offset-bg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      type="button"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button type="button" onClick={openChainModal}>
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      onClick={openChainModal}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button type="button" onClick={openAccountModal}>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};
