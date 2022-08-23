import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";

import { HeaderSearchBarItem } from "@lightdotso/app/components/HeaderSearchBarItem";
import { HeaderSearchBarLoading } from "@lightdotso/app/components/HeaderSearchBarLoading";
import { useDebouncedValue } from "@lightdotso/app/hooks/useDebouncedValue";
import { useEnsQuery } from "@lightdotso/app/hooks/useEnsQuery";

export const HeaderSearchBar: FC = () => {
  let [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 300);
  const { domains, isLoading } = useEnsQuery(debouncedQuery);
  const router = useRouter();

  return (
    <div className="hidden grow items-center px-2 sm:inset-0 sm:flex xl:ml-3 xl:justify-center 2xl:absolute">
      <form autoComplete="off" className="group w-full 2xl:max-w-3xl">
        <Combobox
          value={query}
          onChange={value => {
            router.push(`/${value}`);
            setQuery("");
          }}
        >
          <Combobox.Label htmlFor="search" className="sr-only">
            Search
          </Combobox.Label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-contrast-medium"
                aria-hidden="true"
              />
            </div>
            <Combobox.Input
              id="search"
              name="search"
              className="block w-full rounded-full border border-contrast-lower bg-bg py-2.5 pr-3 pl-10 text-sm text-contrast-high placeholder:text-contrast-low focus:border-transparent focus:text-contrast-higher focus:ring-2 focus:ring-primary-light"
              placeholder="Search by ENS or wallet address"
              type="search"
              onKeyDownCapture={e => {
                if (e.key === "Enter") {
                  return router.push(query);
                }
              }}
              onChange={e => {
                return setQuery(e.target.value);
              }}
            />
          </div>
          <div
            className={clsx(
              "absolute z-30 w-full max-w-3xl rounded-md border-contrast-lower bg-bg shadow-lg",
              query && "group-focus-within:border",
            )}
          >
            <Combobox.Options className="max-h-96 overflow-auto rounded-md p-2 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
              {isLoading && <HeaderSearchBarLoading />}
              {domains &&
                domains.map(domain => {
                  return (
                    <Combobox.Option
                      key={domain.name}
                      value={domain.name}
                      className={({ active }) => {
                        return clsx(
                          "relative cursor-pointer select-none p-2 focus:outline-none",
                          active && "rounded-md bg-emphasis-medium",
                        );
                      }}
                    >
                      {({ selected }) => {
                        return (
                          <HeaderSearchBarItem
                            address={domain?.resolver?.addr?.id}
                            ens={domain.name}
                            selected={selected}
                          />
                        );
                      }}
                    </Combobox.Option>
                  );
                })}
            </Combobox.Options>
          </div>
        </Combobox>
      </form>
    </div>
  );
};
