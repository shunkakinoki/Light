import { Squares2X2Icon, RectangleStackIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import type { SVGProps, FC } from "react";

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
  const slug = useMemo(() => {
    const slug = ens ?? address;
    return slug;
  }, [address, ens]);

  const tabs = useMemo<
    {
      name: string;
      href: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
      active: ActiveProfileTab;
    }[]
  >(() => {
    return [
      {
        name: "Board",
        href: `/${slug}`,
        icon: Squares2X2Icon,
        active: "Board",
      },
      {
        name: "Timeline",
        href: `/${slug}/timeline`,
        icon: RectangleStackIcon,
        active: "Timeline",
      },
    ];
  }, [slug]);

  return (
    <div className="overflow-y-hidden overflow-x-scroll border-b border-contrast-lower">
      <div className="md:mx-auto md:max-w-container">
        <nav
          className="-mb-px flex justify-center space-x-8 md:justify-start"
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
                    !slug && "pointer-events-none",
                    "group inline-flex items-center border-b-4 p-4 text-sm font-medium",
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
    </div>
  );
};
