/* eslint-disable no-restricted-imports */

import type { FC } from "react";

import { FooterList } from "../FooterList";
import { FooterModeSelect } from "../FooterModeSelect";
import { FooterSocial } from "../FooterSocial";

export const Footer: FC = () => {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <FooterSocial />
          <FooterList />
        </div>
        <div className="mt-12 space-y-6 border-t border-contrast-lower pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-contrast-medium xl:text-center">
            &copy; {new Date().getFullYear()} Light, Inc. All rights reserved.
          </p>
          <FooterModeSelect />
        </div>
      </div>
    </footer>
  );
};
