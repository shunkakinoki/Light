import { Logo } from "@lightdotso/core";
import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

export const HeaderLogo: FC = () => {
  return (
    <div className="flex relative z-10 flex-none">
      <div className="flex shrink-0 items-center">
        <Link passHref href="/">
          <a
            className={clsx(
              "inline-flex items-center py-2 px-3 hover:bg-contrast-lower rounded-md",
            )}
          >
            <Logo className="block w-auto h-8" />
          </a>
        </Link>
      </div>
    </div>
  );
};
