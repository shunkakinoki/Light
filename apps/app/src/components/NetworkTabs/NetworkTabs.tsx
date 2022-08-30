import { UserGroupIcon } from "@heroicons/react/24/solid";
import type { NetworkType } from "@lightdotso/types";
import clsx from "clsx";
import Link from "next/link";
import type { SVGProps, FC } from "react";

export type ActiveProfileTab = "People";

export type NetworkTabsProps = {
  active: ActiveProfileTab;
  id: string;
  type: NetworkType;
};

export const NetworkTabs: FC<NetworkTabsProps> = ({
  active = "Board",
  id,
  type,
}) => {
  const tabs: {
    name: string;
    href: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    active: ActiveProfileTab;
  }[] = [
    {
      name: "People",
      href: `/${type.toLowerCase()}/${id}`,
      icon: UserGroupIcon,
      active: "People",
    },
  ];

  return (
    <div className="overflow-y-hidden overflow-x-scroll border-b border-contrast-lower bg-bg-lighter lg:bg-bg">
      <nav
        className="-mb-px flex justify-center space-x-8 lg:justify-start"
        aria-label="Tabs"
      >
        {tabs.map(tab => {
          return (
            <Link key={tab.name} passHref href={tab.href}>
              <a
                className={clsx(
                  tab.active === active
                    ? "border-contrast-high text-contrast-higher"
                    : "border-transparent text-contrast-medium hover:border-contrast-medium hover:text-contrast-higher",
                  !id && "pointer-events-none",
                  "group inline-flex items-center border-b-4 py-4 px-3 text-sm font-medium",
                )}
                aria-current={tab.active === active ? "page" : undefined}
              >
                <tab.icon
                  className={clsx(
                    tab.active === active
                      ? "text-contrast-higher"
                      : "text-contrast-medium group-hover:text-contrast-high",
                    "mr-2 -ml-0.5 h-5 w-5",
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
