import type { GalaxyCampaign } from "@lightdotso/types";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export type BaseOATProps = { oat: GalaxyCampaign["data"]["campaign"] };

export const BaseOAT: FC<BaseOATProps> = ({ oat: { thumbnail } }) => {
  return (
    <NextImage
      layout="fill"
      className="h-full w-full object-cover"
      src={thumbnail}
      loading="lazy"
    />
  );
};
