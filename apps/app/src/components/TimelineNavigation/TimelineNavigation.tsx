import { Menu } from "@headlessui/react";
import { CollectionIcon } from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconPoap, IconNFT, IconDAO, IconTokens } from "@lightdotso/core";
import type { CategoryType } from "@prisma/client";
import clsx from "clsx";
import type { FC, SVGProps } from "react";

import { useTimelineCategory } from "@lightdotso/app/hooks/useTimelineCategory";

const navigation: Array<{
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  category: CategoryType | "ALL";
}> = [
  { name: "All", icon: CollectionIcon, category: "ALL" },
  // { name: "DeFi", icon: IconTokens, category: "DEFI" },
  { name: "NFT", icon: IconNFT, category: "NFT" },
  { name: "DAO", icon: IconDAO, category: "DAO" },
  { name: "Social", icon: UserGroupIcon, category: "SOCIAL" },
  // { name: "Other", icon: IconPoap, category: "OTHER" },
];

export const TimelineNavigation: FC = () => {
  const { timelineCategoryState, setTimelineCategoryState } =
    useTimelineCategory();

  return (
    <>
      <div className="flex md:hidden">
        <Menu>
          <Menu.Button className="flex fixed -right-6 bottom-10 visible z-30 justify-center items-center p-3 m-8 w-14 h-14 text-contrast-high bg-bg-light hover:bg-bg-lighter rounded-full border border-contrast-lower">
            {navigation
              .filter(item => {
                return item.category === timelineCategoryState.category;
              })
              .map(item => {
                return (
                  <item.icon
                    key={item.name}
                    className={clsx(
                      timelineCategoryState.category === item.category
                        ? "text-contrast-higher fill-contrast-higher"
                        : "text-contrast-high group-hover:text-contrast-higher fill-contrast-high",
                      "shrink-0 w-6 h-6",
                    )}
                    aria-hidden="true"
                  />
                );
              })}
          </Menu.Button>
          <Menu.Items className="flex fixed -right-6 bottom-36 z-30 flex-col">
            {navigation
              .filter(item => {
                return item.category !== timelineCategoryState.category;
              })
              .map(item => {
                return (
                  <Menu.Item key={item.name}>
                    {({ active }) => {
                      return (
                        <button
                          className={clsx(
                            "flex justify-center items-center p-3 my-2 mx-8 w-14 h-14 bg-bg-lighter hover:bg-bg-light rounded-full border border-contrast-lower",
                            active && "text-contrast-higher",
                          )}
                          onClick={() => {
                            return setTimelineCategoryState({
                              category: item.category,
                            });
                          }}
                        >
                          <item.icon
                            className={clsx(
                              timelineCategoryState.category === item.category
                                ? "text-contrast-higher fill-contrast-higher"
                                : "text-contrast-high group-hover:text-contrast-higher fill-contrast-high",
                              "shrink-0 w-6 h-6",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    }}
                  </Menu.Item>
                );
              })}
          </Menu.Items>
        </Menu>
      </div>
      <nav
        className="hidden md:block sticky top-4 space-y-1"
        aria-label="Sidebar"
      >
        {navigation.map(item => {
          return (
            <button
              key={item.name}
              className={clsx(
                timelineCategoryState.category === item.category
                  ? "text-contrast-higher bg-emphasis-high"
                  : "text-contrast-medium hover:text-contrast-high hover:bg-emphasis-medium",
                "group flex items-center py-2 px-3 w-full text-sm font-medium rounded-md",
              )}
              aria-current={
                timelineCategoryState.category === item.category
                  ? "page"
                  : undefined
              }
              onClick={() => {
                return setTimelineCategoryState({ category: item.category });
              }}
            >
              <item.icon
                className={clsx(
                  timelineCategoryState.category === item.category
                    ? "text-contrast-higher fill-contrast-higher"
                    : "text-contrast-high group-hover:text-contrast-higher fill-contrast-high",
                  "shrink-0 mr-3 -ml-1 w-6 h-6",
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
