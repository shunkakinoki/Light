import type { PoapBaseEvent } from "@lightdotso/types";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export type BasePoapProps = { event: PoapBaseEvent };

const poapImage = (eventId: number) => {
  return `https://api.poap.xyz/token/${eventId}/image`;
};

export const BasePoap: FC<BasePoapProps> = ({
  event: { id, image_url, name },
}) => {
  return (
    <NextImage
      layout="fill"
      className="h-full w-full object-cover"
      src={image_url ?? poapImage(id)}
      alt={name}
      loading="lazy"
    />
  );
};
