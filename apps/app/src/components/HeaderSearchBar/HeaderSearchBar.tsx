import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
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
    <div className="hidden sm:flex 2xl:absolute sm:inset-0 grow xl:justify-center items-center px-2 xl:ml-3">
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
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <SearchIcon
                className="w-5 h-5 text-contrast-medium"
                aria-hidden="true"
              />
            </div>
            <Combobox.Input
              id="search"
              name="search"
              className="block py-2.5 pr-3 pl-10 w-full text-sm text-contrast-high placeholder:text-contrast-low focus:text-contrast-higher bg-bg rounded-full border border-contrast-lower focus:border-transparent focus:ring-2 focus:ring-primary-light"
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
              "absolute z-30 w-full max-w-3xl bg-bg rounded-md border-contrast-lower shadow-lg",
              query && "group-focus-within:border",
            )}
          >
            <Combobox.Options className="overflow-auto p-2 max-h-96 text-base sm:text-sm leading-6 sm:leading-5 rounded-md focus:outline-none">
              {isLoading && <HeaderSearchBarLoading />}
              {domains &&
                domains.map(domain => {
                  return (
                    <Combobox.Option
                      key={domain.name}
                      value={domain.name}
                      className={({ active }) => {
                        return clsx(
                          "relative p-2 focus:outline-none cursor-pointer select-none",
                          active && "bg-emphasis-medium rounded-md",
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
