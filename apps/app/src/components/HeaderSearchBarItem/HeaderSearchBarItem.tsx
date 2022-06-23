import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import { FaTwitter } from "react-icons/fa";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";

export type HeaderSearchBarItemProps = {
  address: string;
  ens: string;
  selected: boolean;
};

export const HeaderSearchBarItem: FC<HeaderSearchBarItemProps> = ({
  address,
  ens,
  selected,
}) => {
  const { identity, isLoading } = useCyberConnectIdentity(address);

  return (
    <Link passHref href={`/${ens}`}>
      <a className="flex items-center">
        <PlaceholderAvatar
          address={address}
          className="relative shrink-0 w-10 h-10 opacity-100"
        />
        <div className="flex flex-col ml-4">
          <span
            className={clsx(
              "block text-base leading-6 text-contrast-higher truncate",
              selected ? "font-bold" : "font-semibold",
            )}
          >
            {ens}
          </span>
          <div className="inline-flex items-center text-contrast-medium">
            {isLoading && (
              <>
                <LoadingText />
                &nbsp;
              </>
            )}
            {identity?.social?.twitter && (
              <>
                <FaTwitter className="w-4 h-4" aria-hidden="true" />
                &nbsp; @{identity?.social?.twitter}
              </>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};
