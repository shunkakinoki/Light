import { Logo } from "@lightdotso/common";
import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

export const HeaderLogo: FC = () => {
  return (
    <div className="relative z-10 flex flex-none">
      <div className="flex shrink-0 items-center">
        <Link passHref href="/">
          <a
            className={clsx(
              "inline-flex items-center rounded-md py-2 px-3 hover:bg-contrast-lower",
            )}
          >
            <Logo className="block h-8 w-auto" />
          </a>
        </Link>
      </div>
    </div>
  );
};
