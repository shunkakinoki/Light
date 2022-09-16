import { Menu } from "@headlessui/react";
import type { FC } from "react";

import { HeaderMenu } from "@lightdotso/app/components/HeaderMenu";
import { HeaderPillAddress } from "@lightdotso/app/components/HeaderPillAddress";
import { HeaderPillConnect } from "@lightdotso/app/components/HeaderPillConnect";
import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const HeaderPill: FC = () => {
  const { address, disconnect } = useWallet();
  const { ens } = useEns(address);

  return (
    <Menu as="div" className="relative ml-4 shrink-0">
      <div className="group relative">
        <PlaceholderBlur />
        {address ? (
          <HeaderPillAddress address={address} ens={ens} />
        ) : (
          <HeaderPillConnect />
        )}
      </div>
      <HeaderMenu onDisconnect={disconnect} />
    </Menu>
  );
};
