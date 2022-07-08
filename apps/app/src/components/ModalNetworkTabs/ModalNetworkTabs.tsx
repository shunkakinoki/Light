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
          className="block w-full rounded-md border-contrast-medium bg-bg text-contrast-high"
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
        <nav className="group relative z-0 flex divide-x divide-contrast-medium rounded-lg border border-contrast-medium shadow">
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
                  "group relative min-w-0 flex-1 overflow-hidden py-3 px-4 text-center text-sm font-medium hover:bg-emphasis-medium focus:z-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
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
