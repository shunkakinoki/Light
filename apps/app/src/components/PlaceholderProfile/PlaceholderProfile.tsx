import Link from "next/link";
import type { FC } from "react";

import { useEnsName } from "wagmi";

import type { PlaceholderAvatarProps } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";

export type PlaceholderProfileProps = { ens?: string } & PlaceholderAvatarProps;

export const PlaceholderProfile: FC<PlaceholderProfileProps> = ({
  address,
  ens: initialEns,
}) => {
  const { data: ens } = useEnsName({ address: address });

  return (
    <Link passHref href={`/${ens ?? address}`}>
      <a className="group relative shrink-0">
        <PlaceholderBlur />
        <PlaceholderAvatar
          address={address}
          className="relative h-12 w-12 opacity-100"
        />
      </a>
    </Link>
  );
};
