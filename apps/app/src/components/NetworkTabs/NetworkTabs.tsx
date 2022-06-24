import { ViewListIcon, UserGroupIcon } from "@heroicons/react/solid";
import type { NetworkType } from "@lightdotso/types";
import clsx from "clsx";
import Link from "next/link";
import type { SVGProps, FC } from "react";

export type ActiveProfileTab = "People" | "Timeline";

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
    {
      name: "Timeline",
      href: `/${type.toLowerCase()}/${id}/timeline`,
      icon: ViewListIcon,
      active: "Timeline",
    },
  ];

  return (
    <div className="overflow-x-scroll overflow-y-hidden bg-bg-lighter lg:bg-bg border-b border-contrast-lower">
      <nav
        className="flex justify-center lg:justify-start -mb-px space-x-8"
        aria-label="Tabs"
      >
        {tabs.map(tab => {
          return (
            <Link key={tab.name} passHref href={tab.href}>
              <a
                className={clsx(
                  tab.active === active
                    ? "text-contrast-higher border-contrast-high"
                    : "text-contrast-medium hover:text-contrast-higher border-transparent hover:border-contrast-medium",
                  !id && "pointer-events-none",
                  "group inline-flex items-center py-4 px-3 text-sm font-medium border-b-4",
                )}
                aria-current={tab.active === active ? "page" : undefined}
              >
                <tab.icon
                  className={clsx(
                    tab.active === active
                      ? "text-contrast-higher"
                      : "text-contrast-medium group-hover:text-contrast-high",
                    "mr-2 -ml-0.5 w-5 h-5",
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
