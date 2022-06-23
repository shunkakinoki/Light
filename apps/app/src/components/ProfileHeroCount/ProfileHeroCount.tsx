import Link from "next/link";
import type { FC } from "react";

import { useMemo } from "react";

import { LoadingText } from "@lightdotso/app/components/LoadingText";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type ProfileHeroCountProps = {
  address?: string;
  isLoading: boolean;
  followingCount?: number;
  followerCount?: number;
};
export const ProfileHeroCount: FC<ProfileHeroCountProps> = ({
  address,
  isLoading,
  followerCount,
  followingCount,
}) => {
  const { address: walletAddress } = useWallet();
  const { ens } = useEns(address);

  const slug = useMemo(() => {
    const slug = address === walletAddress ? "profile" : ens ?? address;
    return slug;
  }, [address, ens, walletAddress]);

  return (
    <div className="flex justify-center md:justify-start sm:mx-auto">
      <Link passHref href={`/${slug}/following`}>
        <a className="group flex items-center pr-2 border-0 border-r border-contrast-low">
          {isLoading && <LoadingText />}
          <span className="mr-1 font-extrabold text-contrast-higher group-hover:text-contrast-high">
            {followingCount?.toLocaleString()}
          </span>
          <p className="text-sm sm:text-base font-medium leading-6 text-contrast-low group-hover:underline">
            Following
          </p>
        </a>
      </Link>
      <Link passHref href={`/${slug}/followers`}>
        <a className="group flex items-center pl-2">
          {isLoading && <LoadingText />}
          <span className="mr-1 font-extrabold text-contrast-higher group-hover:text-contrast-high">
            {followerCount?.toLocaleString()}
          </span>
          <p className="text-sm sm:text-base font-medium leading-6 text-contrast-low group-hover:underline">
            Followers
          </p>
        </a>
      </Link>
    </div>
  );
};
