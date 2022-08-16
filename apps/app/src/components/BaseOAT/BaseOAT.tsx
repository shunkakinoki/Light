import type { GalaxyCampaign } from "@lightdotso/types";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export type BaseOATProps = { oat: GalaxyCampaign };

export const BaseOAT: FC<BaseOATProps> = ({
  oat: {
    data: {
      campaign: { thumbnail },
    },
  },
}) => {
  return (
    <NextImage
      layout="fill"
      className="h-full w-full object-cover"
      src={thumbnail}
      loading="lazy"
    />
  );
};
