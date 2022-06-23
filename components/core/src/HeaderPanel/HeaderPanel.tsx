/* eslint-disable no-restricted-imports */

import { Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/outline";
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
        className="lg:hidden fixed inset-x-0 top-0 z-10 p-3 transition origin-top-right"
        aria-label="Global"
      >
        <div className="bg-bg rounded-md border border-contrast-lower">
          <div className="flex justify-between items-center px-4 pt-4">
            <div>
              <Logo />
            </div>
            <div className="-mr-2">
              <button
                className="inline-flex justify-center items-center p-2 text-contrast-medium hover:text-contrast-higher hover:bg-bg-light rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={onClick}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 p-6 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-contrast-low uppercase">
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
              <h3 className="text-sm font-semibold tracking-wider text-contrast-low uppercase">
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
              <h3 className="text-sm font-semibold tracking-wider text-contrast-low uppercase">
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
          <div className="flex justify-center px-6 mt-6">
            <Link passHref href="/explore">
              <a className="inline-flex justify-center items-center py-3 w-full text-base font-medium text-contrast-lower bg-contrast-higher hover:bg-contrast-low rounded-md">
                <GlobeAltIcon
                  className="mr-2 -ml-0.5 w-4 h-4"
                  aria-hidden="true"
                />
                Explore now
              </a>
            </Link>
          </div>
          <div className="flex justify-center mt-6 text-contrast-medium">
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
          <div className="flex justify-center my-6">
            <ListSocial />
          </div>
        </div>
      </div>
    </Transition>
  );
};
