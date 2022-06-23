import { GlobeAltIcon, HomeIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

export type HeaderActionsProps = {
  active?: "Home" | "Explore" | "";
};

export const HeaderActions: FC<HeaderActionsProps> = ({ active = "None" }) => {
  return (
    <div className="flex items-center ml-4">
      <span className="block">
        <Link passHref href="/">
          <a
            className={clsx(
              "inline-flex items-center py-2 px-3 text-xs font-medium text-contrast-higher rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
              active === "Home"
                ? "bg-emphasis-medium"
                : "text-contrast-high hover:bg-emphasis-medium",
            )}
          >
            <HomeIcon
              className={clsx(
                "mr-1 -ml-1 w-5 h-5",
                active === "Home"
                  ? "text-contrast-higher"
                  : "text-contrast-high",
              )}
              aria-hidden="true"
            />
            Home
          </a>
        </Link>
      </span>
      <span className="block ml-3">
        <Link passHref href="/explore">
          <a
            className={clsx(
              "inline-flex items-center py-2 px-3 text-xs font-medium text-contrast-higher rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
              active === "Explore"
                ? "bg-emphasis-medium"
                : "text-contrast-high hover:bg-emphasis-medium",
            )}
          >
            <GlobeAltIcon
              className={clsx(
                "mr-1 -ml-1 w-5 h-5",
                active === "Explore"
                  ? "text-contrast-higher"
                  : "text-contrast-high",
              )}
              aria-hidden="true"
            />
            Explore
          </a>
        </Link>
      </span>
    </div>
  );
};
