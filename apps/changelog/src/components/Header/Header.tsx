import { Logo } from "@lightdotso/core";
import Link from "next/link";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="relative inset-x-0 top-0 z-50 bg-transparent">
      <div className="container mx-auto pl-1.5">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link passHref href="https://light.so">
              <a className="inline-flex items-center rounded-md py-1.5 px-2 hover:bg-contrast-lower">
                <Logo className="h-8 w-24 md:h-10 md:w-28" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
