import { Logo } from "@lightdotso/core";
import type { FC } from "react";

export const AssetFooter: FC = () => {
  return (
    <div className="flex h-20 flex-col items-center space-y-3 px-4 pb-4 md:flex-row md:px-8 lg:px-8">
      <a className="inline-flex flex-1 items-center pb-3">
        <Logo className="block h-8 w-auto" />
      </a>
      <div className="grow" />
      <div className="box-border flex justify-between">
        <p className="text-xs leading-none text-contrast-low">
          Copyright © {new Date().getFullYear()} Light Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};
