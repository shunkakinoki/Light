import Link from "next/link";
import type { FC } from "react";

import { PlaceholderProfile } from "@lightdotso/app/components/PlaceholderProfile";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const BannerProfile: FC = () => {
  const { address } = useWallet();

  return (
    <div className="pb-5 sm:pb-8">
      <div className="px-2 sm:px-6 lg:px-8 mx-auto max-w-3xl">
        <div className="py-2 sm:py-3 px-3 sm:px-4 bg-bg-lighter rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-between items-center">
            <div className="hidden sm:flex flex-1 items-center w-0">
              <span className="flex rounded-lg">
                <PlaceholderProfile
                  className="w-6 h-6 text-contrast-higher"
                  address={address}
                />
              </span>
              <p className="ml-4 font-medium text-contrast-higher truncate">
                See your profile in the metaverse
              </p>
            </div>
            <div className="shrink-0 order-3 sm:order-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <Link href="/profile">
                <a className="flex justify-center items-center py-2 px-4 text-sm font-medium text-contrast-lower bg-contrast-higher hover:bg-contrast-medium rounded-md border border-transparent focus:border-transparent focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ring-offset-bg-lighter shadow-sm ">
                  Go to your profile
                </a>
              </Link>
            </div>
            <div className="shrink-0 order-2 sm:order-3 sm:ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
