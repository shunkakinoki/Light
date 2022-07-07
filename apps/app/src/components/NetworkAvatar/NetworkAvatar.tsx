import clsx from "clsx";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";
import { ipfsAddress } from "@lightdotso/app/utils/ipfsAddress";
import { shortenName } from "@lightdotso/app/utils/shortenName";

export type NetworkAvatarProps = {
  avatar: string;
  name: string;
  id: string;
  className?: string;
};

export const NetworkAvatar: FC<NetworkAvatarProps> = ({
  avatar,
  name,
  id,
  className,
}) => {
  if (avatar?.includes("ipfs")) {
    return (
      <NextImage
        width={96}
        height={96}
        useBlur={false}
        src={ipfsAddress(avatar.substring(7))}
        alt={name}
        className={clsx("rounded-full", className)}
      />
    );
  }

  if (avatar?.includes("https")) {
    return (
      <NextImage
        width={96}
        height={96}
        useBlur={false}
        src={avatar}
        alt={name}
        className={clsx("rounded-full", className)}
      />
    );
  }

  if (name) {
    return (
      <span
        className={clsx(
          "flex items-center justify-start rounded-full border-2 border-contrast-lower text-3xl font-semibold leading-none text-contrast-low md:text-5xl",
          className,
        )}
      >
        {shortenName(name ?? id)}
      </span>
    );
  }

  return null;
};
