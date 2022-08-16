import Link from "next/link";
import type { FC } from "react";

import { useEnsName } from "wagmi";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export type FollowBannerProps = {
  address: string;
  ens?: string;
};

export const FollowBanner: FC<FollowBannerProps> = ({
  address,
  ens: initialEns,
}) => {
  const { data: ens, isLoading: isEnsLoading } = useEnsName({
    address: address,
  });
  const { identity } = useCyberConnectIdentity(address);
  const truncatedAddress = splitAddress(address);
  const slug = isEnsLoading ? truncatedAddress : ens ?? truncatedAddress;

  return (
    <div className="flex grow flex-col justify-start">
      <div className="flex items-center space-x-3">
        <Link passHref href={`/${ens ?? address}`}>
          <a className="overflow-hidden text-ellipsis break-all text-sm font-medium text-contrast-high line-clamp-1 hover:underline">
            {slug}
          </a>
        </Link>
      </div>
      <div className="mt-1 flex items-center truncate text-sm text-contrast-medium">
        {identity?.followerCount === undefined && (
          <>
            <LoadingText />
            &nbsp;
          </>
        )}
        {identity?.followerCount.toLocaleString()} Followers
      </div>
    </div>
  );
};
