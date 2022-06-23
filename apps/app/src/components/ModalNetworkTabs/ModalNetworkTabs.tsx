import type { NetworkType } from "@lightdotso/types";
import clsx from "clsx";

import { useNetworkType } from "@lightdotso/app/hooks/useNetworkType";

const tabs: { name: string; type: NetworkType }[] = [
  { name: "All", type: "ALL" },
  { name: "DAOs", type: "DAO" },
  { name: "POAPs", type: "POAP" },
];

export const ModalNetworkTabs = () => {
  const { networkType, setNetworkType } = useNetworkType();

  return (
    <div className="pt-3 pb-2">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full text-contrast-high bg-bg rounded-md border-contrast-medium"
          defaultValue={
            tabs.find(tab => {
              return networkType === tab.type;
            }).name
          }
          onChange={e => {
            return setNetworkType(e.target.value as NetworkType);
          }}
        >
          {tabs.map(tab => {
            return (
              <option key={tab.name} value={tab.type}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="group flex relative z-0 rounded-lg border border-contrast-medium divide-x divide-contrast-medium shadow">
          {tabs.map((tab, index) => {
            return (
              <button
                key={tab.name}
                className={clsx(
                  index === 0 ? "rounded-l-lg" : "",
                  index === tabs.length - 1 ? "rounded-r-lg" : "",
                  networkType === tab.type
                    ? "text-contrast-higher ring-2 ring-primary"
                    : "text-contrast-medium hover:text-contrast-high",
                  index === 0 && "rounded-l-lg",
                  index === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group overflow-hidden relative focus:z-10 flex-1 py-3 px-4 min-w-0 text-sm font-medium text-center hover:bg-emphasis-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
                )}
                aria-current={networkType === tab.type ? "page" : undefined}
                onClick={() => {
                  setNetworkType(tab.type);
                }}
              >
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
