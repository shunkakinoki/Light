import { ViewListIcon, ViewGridIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import type { SVGProps, FC } from "react";

import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type ActiveProfileTab = "Board" | "Timeline" | "Activity";

export type ProfileHeroTabsProps = {
  active?: ActiveProfileTab;
  address?: string;
  ens?: string;
};

export const ProfileHeroTabs: FC<ProfileHeroTabsProps> = ({
  active = "Board",
  address,
  ens,
}) => {
  const { address: walletAddress } = useWallet();

  const slug = useMemo(() => {
    const slug = address === walletAddress ? "profile" : ens ?? address;
    return slug;
  }, [address, ens, walletAddress]);

  const tabs = useMemo<
    {
      name: string;
      href: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
      active: ActiveProfileTab;
    }[]
  >(() => {
    return [
      { name: "Board", href: `/${slug}`, icon: ViewGridIcon, active: "Board" },
      {
        name: "Timeline",
        href: `/${slug}/timeline`,
        icon: ViewListIcon,
        active: "Timeline",
      },
    ];
  }, [slug]);

  return (
    <div className="overflow-x-scroll overflow-y-hidden border-b border-contrast-lower">
      <div className="md:mx-auto md:max-w-container">
        <nav
          className="flex justify-center md:justify-start -mb-px space-x-8"
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
                    !slug && "pointer-events-none",
                    "group inline-flex items-center p-4 text-sm font-medium border-b-4",
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
    </div>
  );
};
