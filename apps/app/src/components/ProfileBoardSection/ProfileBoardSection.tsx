import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { IconNFT, IconTokens, IconPoap } from "@lightdotso/core";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";

import { ProfileBoardSectionLoading } from "@lightdotso/app/components/ProfileBoardSectionLoading";
import { ProfileBoardSectionTokenLoading } from "@lightdotso/app/components/ProfileBoardSectionTokenLoading";

export enum ProfileBoardKeysArray {
  "nft" = "NFTs",
  "poap" = "POAPs",
  "dao" = "DAOs",
  "mirror" = "Mirror",
  "token" = "Tokens",
  "pin" = "Pinned",
}

export type ProfileBoardSectionProps = {
  base: ReactNode;
  disabled: boolean;
  defaultOpen?: boolean;
  isLoading: boolean;
  type: keyof typeof ProfileBoardKeysArray;
};

const ProfileBoardSectionGridLayout: FC = ({ children }) => {
  return (
    <div className="grid">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6 md:gap-4 md:p-3 lg:gap-6">
        {children}
      </div>
    </div>
  );
};

const ProfileBoardTokenTableLayout: FC = ({ children }) => {
  return (
    <div className="relative overflow-auto rounded-md">
      <div className="overflow-hidden shadow-sm">
        <table className="w-full table-fixed border-collapse border-contrast-lower text-left text-sm">
          {children}
        </table>
      </div>
    </div>
  );
};

export const ProfileBoardSection: FC<ProfileBoardSectionProps> = ({
  children,
  base,
  disabled,
  isLoading,
  type,
  defaultOpen = false,
}) => {
  const isGrid = useMemo(() => {
    return type === "nft" || type === "poap";
  }, [type]);
  const isToken = useMemo(() => {
    return type === "token";
  }, [type]);

  return (
    <div className="w-full py-2 px-3 sm:py-3 md:py-4 lg:px-0">
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button
                disabled={disabled}
                className={clsx(
                  "group mb-8 flex w-full items-center justify-between border-b border-contrast-lower p-4 text-left text-sm font-medium transition duration-300 hover:border-contrast-low",
                  !disabled && "hover:bg-emphasis-medium",
                )}
              >
                <h1 className="flex items-center text-lg font-extrabold leading-relaxed text-contrast-high group-hover:text-contrast-higher md:text-3xl">
                  {type === "nft" && (
                    <IconNFT className="mr-2 fill-contrast-high group-hover:fill-contrast-higher" />
                  )}
                  {type === "poap" && (
                    <IconPoap className="mr-2 fill-contrast-high group-hover:fill-contrast-higher" />
                  )}
                  {type === "token" && (
                    <IconTokens className="mr-2 fill-contrast-high group-hover:fill-contrast-higher" />
                  )}
                  {ProfileBoardKeysArray[type]}&ensp;
                </h1>
                {!disabled && (
                  <ChevronUpIcon
                    className={clsx(
                      "h-5 w-5 text-contrast-medium group-hover:text-contrast-higher",
                      open && "rotate-180",
                    )}
                  />
                )}
              </Disclosure.Button>
              {isGrid && (
                <ProfileBoardSectionGridLayout>
                  {isLoading ? <ProfileBoardSectionLoading /> : base}
                </ProfileBoardSectionGridLayout>
              )}
              {isToken && (
                <ProfileBoardTokenTableLayout>
                  <>
                    <thead>
                      <tr className="flex w-full">
                        <th className="grow pb-3 pl-4 font-medium text-contrast-high">
                          Token
                        </th>
                        <th className="shrink-0 pb-3 font-medium text-contrast-high">
                          Balance
                        </th>
                        <th className="flex w-1/4 flex-initial shrink-0 justify-end pr-4 pb-3 font-medium text-contrast-high sm:w-1/5 md:w-1/6">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? <ProfileBoardSectionTokenLoading /> : base}
                    </tbody>
                  </>
                </ProfileBoardTokenTableLayout>
              )}
              <Transition
                show={open}
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel>
                  {isGrid && (
                    <ProfileBoardSectionGridLayout>
                      {children}
                    </ProfileBoardSectionGridLayout>
                  )}
                  {isToken && (
                    <ProfileBoardTokenTableLayout>
                      <tbody>{children}</tbody>
                    </ProfileBoardTokenTableLayout>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};
