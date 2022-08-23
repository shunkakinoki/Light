import { ArrowUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { FC } from "react";

import { PlaceholderProfile } from "@lightdotso/app/components/PlaceholderProfile";
import { useEns } from "@lightdotso/app/hooks/useEns";

export type AssetDetailsSegmentProfileProps = {
  address: string;
};

import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export const AssetDetailsSegmentProfile: FC<
  AssetDetailsSegmentProfileProps
> = ({ address }) => {
  const { ens } = useEns(address);

  return (
    <div className="flex items-center">
      <PlaceholderProfile address={address} />
      <Link href={`/${ens ?? address}`}>
        <a className="group ml-4 text-xl font-bold text-contrast-higher hover:underline">
          {ens ?? splitAddress(address)}
        </a>
      </Link>
      <a href={`https://etherscan.io/address/${address}`}>
        <ArrowUpIcon className="ml-2 inline-block h-5 w-5 rotate-45 text-contrast-high group-hover:animate-pulse" />
      </a>
    </div>
  );
};
