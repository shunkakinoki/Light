import clsx from "clsx";
import type { FC } from "react";

import type { NextImageProps } from "@lightdotso/app/components/NextImage";
import { NextImage } from "@lightdotso/app/components/NextImage";
import type { PlaceholderOrbProps } from "@lightdotso/app/components/PlaceholderOrb";
import { PlaceholderOrb } from "@lightdotso/app/components/PlaceholderOrb";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useEnsAvatar } from "@lightdotso/app/hooks/useEnsAvatar";

export type PlaceholderAvatarProps = PlaceholderOrbProps &
  Partial<Pick<NextImageProps, "height" | "width">>;

export const PlaceholderAvatar: FC<PlaceholderAvatarProps> = ({
  address,
  width = 48,
  height = 48,
  className,
}) => {
  const { ens } = useEns(address);
  const { avatar } = useEnsAvatar(ens);

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
          "inline-block overflow-hidden shrink-0 rounded-full",
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
