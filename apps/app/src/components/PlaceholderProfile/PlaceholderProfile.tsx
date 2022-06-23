import Link from "next/link";
import type { FC } from "react";

import type { PlaceholderAvatarProps } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";
import { useEns } from "@lightdotso/app/hooks/useEns";

export type PlaceholderProfileProps = { ens?: string } & PlaceholderAvatarProps;

export const PlaceholderProfile: FC<PlaceholderProfileProps> = ({
  address,
  ens: initialEns,
}) => {
  const { ens } = useEns(address, initialEns);

  return (
    <Link passHref href={`/${ens ?? address}`}>
      <a className="group relative shrink-0">
        <PlaceholderBlur />
        <PlaceholderAvatar
          address={address}
          className="relative w-12 h-12 opacity-100"
        />
      </a>
    </Link>
  );
};
