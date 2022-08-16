import clsx from "clsx";
import type { FC } from "react";

import { useEnsName, useEnsAvatar } from "wagmi";

import type { NextImageProps } from "@lightdotso/app/components/NextImage";
import { NextImage } from "@lightdotso/app/components/NextImage";
import type { PlaceholderOrbProps } from "@lightdotso/app/components/PlaceholderOrb";
import { PlaceholderOrb } from "@lightdotso/app/components/PlaceholderOrb";

export type PlaceholderAvatarProps = PlaceholderOrbProps &
  Partial<Pick<NextImageProps, "height" | "width">>;

export const PlaceholderAvatar: FC<PlaceholderAvatarProps> = ({
  address,
  width = 48,
  height = 48,
  className,
}) => {
  const { data: ens } = useEnsName({ address: address });
  const { data: avatar } = useEnsAvatar({ addressOrName: ens ?? address });

  if (avatar) {
    return (
      <NextImage
        width={width}
        height={height}
        useBlur={false}
        src={avatar}
        alt={`ENS Avatar for ${ens ?? address}`}
        //TODO: refactor placeholder avatar css
        className={clsx(
          "inline-block shrink-0 overflow-hidden rounded-full",
          className,
        )}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/placeholder.svg";
        }}
      />
    );
  }

  return <PlaceholderOrb address={address} className={className} />;
};
