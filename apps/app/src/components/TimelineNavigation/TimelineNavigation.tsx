import { Menu } from "@headlessui/react";
import { CollectionIcon } from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconPoap, IconNFT, IconDAO, IconTokens } from "@lightdotso/core";
import type { CategoryType } from "@prisma/client";
import clsx from "clsx";
import type { FC, SVGProps } from "react";

import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";
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
          <div className="fixed -right-6 bottom-10 z-30 flex md:right-48">
            <div className="group relative mr-8 mb-8">
              <PlaceholderBlur />
              <Menu.Button className="visible relative flex h-14 w-14 items-center justify-center rounded-full border border-contrast-lower bg-bg-light p-3 text-contrast-high hover:bg-bg-lighter">
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
                            ? "fill-primary text-primary"
                            : "fill-contrast-high text-contrast-high group-hover:text-contrast-higher",
                          "h-6 w-6 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                    );
                  })}
              </Menu.Button>
            </div>
          </div>
          <Menu.Items className="fixed -right-6 bottom-36 z-30 flex flex-col md:right-48">
            {navigation
              .filter(item => {
                return item.category !== timelineCategoryState.category;
              })
              .map(item => {
                return (
                  <Menu.Item key={item.name}>
                    {({ active }) => {
                      return (
                        <div className="group relative my-2 mr-8">
                          <PlaceholderBlur />
                          <button
                            className={clsx(
                              "relative flex h-14 w-14 items-center justify-center rounded-full border border-contrast-lower bg-bg-lighter py-3 hover:bg-bg-light",
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
                                  ? "fill-contrast-higher text-contrast-higher"
                                  : "fill-contrast-high text-contrast-high group-hover:text-contrast-higher",
                                "h-6 w-6 shrink-0",
                              )}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      );
                    }}
                  </Menu.Item>
                );
              })}
          </Menu.Items>
        </Menu>
      </div>
      <nav
        className="sticky top-4 hidden space-y-1 md:block"
        aria-label="Sidebar"
      >
        {navigation.map(item => {
          return (
            <button
              key={item.name}
              className={clsx(
                timelineCategoryState.category === item.category
                  ? "bg-emphasis-high text-contrast-higher"
                  : "text-contrast-medium hover:bg-emphasis-medium hover:text-contrast-high",
                "group flex w-full items-center rounded-md py-2 px-3 text-sm font-medium",
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
                    ? "fill-contrast-higher text-contrast-higher"
                    : "fill-contrast-high text-contrast-high group-hover:text-contrast-higher",
                  "mr-3 -ml-1 h-6 w-6 shrink-0",
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
