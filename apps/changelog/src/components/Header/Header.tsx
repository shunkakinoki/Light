import { Logo } from "@lightdotso/core";
import Link from "next/link";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="relative inset-x-0 top-0 z-50 bg-transparent">
      <div className="container pl-1.5 mx-auto">
        <div className="flex justify-between md:justify-start items-center py-6 md:space-x-10">
          <div className="flex lg:flex-1 justify-start lg:w-0">
            <Link passHref href="https://light.so">
              <a className="inline-flex items-center py-1.5 px-2 hover:bg-contrast-lower rounded-md">
                <Logo className="w-24 md:w-28 h-8 md:h-10" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
