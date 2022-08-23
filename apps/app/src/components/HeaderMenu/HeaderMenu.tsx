import { Menu, Transition } from "@headlessui/react";
import {
  CogIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import type { FC, MouseEventHandler } from "react";
import { Fragment } from "react";

import { HeaderMenuLink } from "@lightdotso/app/components/HeaderMenu/HeaderMenuLink";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type HeaderMenuProps = {
  onDisconnect: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderMenu: FC<HeaderMenuProps> = () => {
  const { address, disconnect } = useWallet();
  const { ens } = useEns(address);

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-contrast-low rounded-md border border-contrast-low bg-bg shadow-lg focus:outline-none">
        <div className="space-y-1 p-1">
          <Menu.Item>
            <HeaderMenuLink
              href={`/${ens ?? address}`}
              className="group flex w-full items-center rounded-md py-2 px-4 text-sm text-contrast-medium hover:bg-emphasis-medium focus:ring-2 focus:ring-primary"
            >
              <UserCircleIcon
                className="mr-4 h-5 w-5 group-hover:text-contrast-higher"
                aria-hidden="true"
              />
              <span className="group-hover:text-contrast-higher">Profile</span>
            </HeaderMenuLink>
          </Menu.Item>
          <Menu.Item>
            <HeaderMenuLink
              href="/settings"
              className="group flex w-full items-center rounded-md py-2 px-4 text-sm text-contrast-medium hover:bg-emphasis-medium focus:ring-2 focus:ring-primary"
            >
              <CogIcon
                className="mr-4 h-5 w-5 group-hover:text-contrast-higher"
                aria-hidden="true"
              />
              <span className="group-hover:text-contrast-higher">Settings</span>
            </HeaderMenuLink>
          </Menu.Item>
        </div>
        <hr />
        <div className="p-1">
          <Menu.Item>
            <button
              className="group flex w-full items-center rounded-md py-2 px-4 text-sm text-contrast-medium hover:bg-emphasis-medium focus:ring-2 focus:ring-primary"
              disabled={!address}
              onClick={disconnect}
            >
              <LogoutIcon
                className="mr-4 h-5 w-5 group-hover:text-contrast-higher"
                aria-hidden="true"
              />
              <span className="group-hover:text-contrast-higher">
                Disconnect
              </span>
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  );
};
