/* eslint-disable no-restricted-imports */

import { Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { XIcon } from "@heroicons/react/solid";
import { NavigationLinks, SocialLinks } from "@lightdotso/const";
import Link from "next/link";
import type { FC, MouseEventHandler } from "react";
import { Fragment } from "react";

import { ListLi } from "../ListLi";
import { ListSocial } from "../ListSocial";
import { Logo } from "../Logo";

export type HeaderPanelProps = {
  show: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderPanel: FC<HeaderPanelProps> = ({ show, onClick }) => {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className="fixed inset-x-0 top-0 z-10 origin-top-right p-3 transition lg:hidden"
        aria-label="Global"
      >
        <div className="rounded-md border border-contrast-lower bg-bg">
          <div className="flex items-center justify-between px-4 pt-4">
            <div>
              <Logo />
            </div>
            <div className="-mr-2">
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-contrast-medium hover:bg-bg-light hover:text-contrast-higher focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={onClick}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 p-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
                Company
              </h3>
              <ul className="space-y-4">
                {NavigationLinks.company.map(item => {
                  return (
                    <ListLi
                      key={item.name}
                      external={item.external}
                      href={item.href}
                    >
                      {item.name}
                    </ListLi>
                  );
                })}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
                Resources
              </h3>
              <ul className="space-y-4">
                {NavigationLinks.resources.map(item => {
                  return (
                    <ListLi
                      key={item.name}
                      external={item.external}
                      href={item.href}
                    >
                      {item.name}
                    </ListLi>
                  );
                })}
              </ul>
            </div>
            <div className="mt-4 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
                Legal
              </h3>
              <ul className="space-y-4">
                {NavigationLinks.legal.map(item => {
                  return (
                    <ListLi
                      key={item.name}
                      external={item.external}
                      href={item.href}
                    >
                      {item.name}
                    </ListLi>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex justify-center px-6">
            <Link passHref href="/explore">
              <a className="inline-flex w-full items-center justify-center rounded-md bg-contrast-higher py-3 text-base font-medium text-contrast-lower hover:bg-contrast-low">
                <GlobeAltIcon
                  className="mr-2 -ml-0.5 h-4 w-4"
                  aria-hidden="true"
                />
                Explore now
              </a>
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-contrast-medium">
            Join our community&nbsp;
            <a
              href={SocialLinks.Discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-contrast-higher hover:underline"
            >
              Discord
            </a>
          </div>
          <div className="my-6 flex justify-center">
            <ListSocial />
          </div>
        </div>
      </div>
    </Transition>
  );
};
