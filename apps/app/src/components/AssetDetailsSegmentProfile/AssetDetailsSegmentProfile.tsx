import { ArrowUpIcon } from "@heroicons/react/solid";
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
        <ArrowUpIcon className="inline-block ml-2 w-5 h-5 text-contrast-high group-hover:animate-pulse rotate-45" />
      </a>
    </div>
  );
};
