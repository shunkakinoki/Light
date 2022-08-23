import { GlobeAltIcon, HomeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

export type HeaderActionsProps = {
  active?: "Home" | "Explore" | "";
};

export const HeaderActions: FC<HeaderActionsProps> = ({ active = "None" }) => {
  return (
    <div className="ml-4 flex items-center">
      <span className="block">
        <Link passHref href="/">
          <a
            className={clsx(
              "inline-flex items-center rounded-md py-2 px-3 text-xs font-medium text-contrast-higher ring-offset-bg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              active === "Home"
                ? "bg-emphasis-medium"
                : "text-contrast-high hover:bg-emphasis-medium",
            )}
          >
            <HomeIcon
              className={clsx(
                "mr-1 -ml-1 h-5 w-5",
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
      <span className="ml-3 block">
        <Link passHref href="/explore">
          <a
            className={clsx(
              "inline-flex items-center rounded-md py-2 px-3 text-xs font-medium text-contrast-higher ring-offset-bg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              active === "Explore"
                ? "bg-emphasis-medium"
                : "text-contrast-high hover:bg-emphasis-medium",
            )}
          >
            <GlobeAltIcon
              className={clsx(
                "mr-1 -ml-1 h-5 w-5",
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
