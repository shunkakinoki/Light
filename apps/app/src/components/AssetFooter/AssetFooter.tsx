import { Logo } from "@lightdotso/core";
import type { FC } from "react";

export const AssetFooter: FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center px-4 md:px-8 lg:px-8 pb-4 space-y-3 h-20">
      <a className="inline-flex flex-1 items-center pb-3">
        <Logo className="block w-auto h-8" />
      </a>
      <div className="grow" />
      <div className="box-border flex justify-between">
        <p className="text-xs leading-none text-contrast-low">
          Copyright © {new Date().getFullYear()} Sentrei Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};
