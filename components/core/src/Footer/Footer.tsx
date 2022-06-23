/* eslint-disable no-restricted-imports */

import type { FC } from "react";

import { FooterList } from "../FooterList";
// import { FooterModeSelect } from "../FooterModeSelect";
import { FooterSocial } from "../FooterSocial";

export const Footer: FC = () => {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="lg:py-16 px-4 sm:px-6 lg:px-8 pt-12 pb-20 mx-auto max-w-7xl">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <FooterSocial />
          <FooterList />
        </div>
        <div className="md:flex md:justify-between md:items-center pt-8 mt-12 space-y-6 border-t border-contrast-lower">
          <p className="text-base xl:text-center text-contrast-medium">
            &copy; {new Date().getFullYear()} Light, Inc. All rights reserved.
          </p>
          {/* <FooterModeSelect /> */}
        </div>
      </div>
    </footer>
  );
};
