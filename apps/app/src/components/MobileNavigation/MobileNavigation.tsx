import {
  HomeIcon,
  ViewListIcon,
  GlobeAltIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, SVGProps } from "react";

export type MobileNavigationTab =
  | "Home"
  | "Explore"
  | "Search"
  | "Profile"
  | "More";

const tabs: {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Explore",
    href: "/explore",
    icon: GlobeAltIcon,
  },
  {
    name: "Search",
    href: "/search",
    icon: SearchIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    name: "More",
    href: "/settings",
    icon: ViewListIcon,
  },
];

export const MobileNavigation: FC = () => {
  const { asPath } = useRouter();

  return (
    <div className="relative w-full sm:hidden">
      <section className="fixed inset-x-0 bottom-0 z-10 block shadow">
        <span className="relative z-0 flex justify-between rounded-md bg-bg px-4 pt-2.5 pb-2 shadow-sm">
          {tabs.map(tab => {
            return (
              <Link key={tab.name} passHref href={tab.href}>
                <a
                  className={clsx(
                    tab.href === asPath
                      ? "text-contrast-higher"
                      : "text-contrast-medium hover:text-contrast-higher",
                    "group inline-flex flex-col items-center justify-center text-sm font-medium",
                  )}
                  aria-current={tab.href === asPath ? "page" : undefined}
                >
                  <tab.icon
                    className={clsx(
                      tab.href === asPath
                        ? "text-contrast-higher"
                        : "text-contrast-medium group-hover:text-contrast-high",
                      "h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-1.5 text-xs font-semibold">
                    {tab.name}
                  </span>
                </a>
              </Link>
            );
          })}
        </span>
      </section>
    </div>
  );
};
