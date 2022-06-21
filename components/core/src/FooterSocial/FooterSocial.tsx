/* eslint-disable no-restricted-imports */

import type { FC } from "react";

import { ListSocial } from "../ListSocial";
import { Logo } from "../Logo";

export const FooterSocial: FC = () => {
  return (
    <div className="space-y-8 xl:col-span-1">
      <a className="inline-flex items-center pb-3">
        <Logo className="block h-10 w-auto" />
      </a>
      <ListSocial />
    </div>
  );
};
