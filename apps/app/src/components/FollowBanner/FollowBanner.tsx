import Link from "next/link";
import type { FC } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export type FollowBannerProps = {
  address: string;
  ens?: string;
};

export const FollowBanner: FC<FollowBannerProps> = ({
  address,
  ens: initialEns,
}) => {
  const { ens, isLoading: isEnsLoading } = useEns(address, initialEns);
  const { identity } = useCyberConnectIdentity(address);
  const truncatedAddress = splitAddress(address);
  const slug = isEnsLoading ? truncatedAddress : ens ?? truncatedAddress;

  return (
    <div className="flex flex-col grow justify-start">
      <div className="flex items-center space-x-3">
        <Link passHref href={`/${ens ?? address}`}>
          <a className="overflow-hidden text-sm font-medium text-contrast-high hover:underline text-ellipsis break-all line-clamp-1">
            {slug}
          </a>
        </Link>
      </div>
      <div className="flex items-center mt-1 text-sm text-contrast-medium truncate">
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
