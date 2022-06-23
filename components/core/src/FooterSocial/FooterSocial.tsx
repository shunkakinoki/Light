/* eslint-disable no-restricted-imports */

import type { FC } from "react";

import { ListSocial } from "../ListSocial";
import { Logo } from "../Logo";

export const FooterSocial: FC = () => {
  return (
    <div className="xl:col-span-1 space-y-8">
      <a className="inline-flex items-center pb-3">
        <Logo className="block w-auto h-10" />
      </a>
      <ListSocial />
    </div>
  );
};
