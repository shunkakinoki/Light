import { HeaderPanel } from "@lightdotso/core";
import clsx from "clsx";
import type { FC } from "react";
import { useState } from "react";

import type { HeaderActionsProps } from "@lightdotso/app/components/HeaderActions";
import { HeaderActions } from "@lightdotso/app/components/HeaderActions";
import { HeaderButton } from "@lightdotso/app/components/HeaderButton";
import { HeaderLogo } from "@lightdotso/app/components/HeaderLogo";
import { HeaderPill } from "@lightdotso/app/components/HeaderPill";
import { HeaderSearchBar } from "@lightdotso/app/components/HeaderSearchBar";

export type HeaderProps = { border?: boolean } & HeaderActionsProps;

export const Header: FC<HeaderProps> = ({ active, border = true }) => {
  const [isHeaderPanelOpen, setHeaderPanelOpen] = useState(false);
  return (
    <div>
      <div
        className={clsx(
          "mx-auto bg-bg-lighter px-1.5 md:px-4 lg:divide-y lg:divide-contrast-lower lg:px-8",
          border && "border-y border-contrast-lower",
        )}
      >
        <div className="relative flex h-16 justify-between sm:h-20">
          <HeaderLogo />
          <HeaderSearchBar />
          <div className="relative z-10 flex items-center lg:hidden">
            <HeaderButton
              open={isHeaderPanelOpen}
              onClick={() => {
                return setHeaderPanelOpen(true);
              }}
            />
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            <HeaderActions active={active} />
            <HeaderPill />
          </div>
        </div>
      </div>
      <HeaderPanel
        show={isHeaderPanelOpen}
        onClick={() => {
          return setHeaderPanelOpen(false);
        }}
      />
    </div>
  );
};
