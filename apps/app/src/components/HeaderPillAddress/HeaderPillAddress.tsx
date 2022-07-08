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
    <Menu.Button className="relative flex items-center justify-center rounded-full border border-contrast-lower bg-bg-lighter px-2 ring-offset-2 ring-offset-bg focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg">
        <label htmlFor="search" className="sr-only">
          Address
        </label>
        <div className="relative my-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <PlaceholderAvatar
              width={32}
              height={32}
              address={address}
              className="h-8 w-8"
            />
          </div>
          <div className="block w-full py-2 pr-3 pl-10 text-sm text-contrast-high">
            {ens ?? splitAddress(address)}
          </div>
        </div>
      </div>
    </Menu.Button>
  );
};
