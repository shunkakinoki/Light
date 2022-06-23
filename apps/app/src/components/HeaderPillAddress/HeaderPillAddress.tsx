import { Menu } from "@headlessui/react";
import type { FC } from "react";

import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export interface HeaderPillAddressProps {
  address: string;
  ens?: string;
}

export const HeaderPillAddress: FC<HeaderPillAddressProps> = ({
  address,
  ens,
}) => {
  return (
    <Menu.Button className="flex relative justify-center items-center px-2 bg-bg-lighter rounded-full border border-contrast-lower focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 ring-offset-bg">
      <div className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg">
        <label htmlFor="search" className="sr-only">
          Address
        </label>
        <div className="relative my-1">
          <div className="flex absolute inset-y-0 left-0 items-center pointer-events-none">
            <PlaceholderAvatar
              width={32}
              height={32}
              address={address}
              className="w-8 h-8"
            />
          </div>
          <div className="block py-2 pr-3 pl-10 w-full text-sm text-contrast-high">
            {ens ?? splitAddress(address)}
          </div>
        </div>
      </div>
    </Menu.Button>
  );
};
