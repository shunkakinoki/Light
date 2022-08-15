import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export type BaseOATProps = { thumbnail: string };

export const BaseOAT: FC<BaseOATProps> = ({ thumbnail }) => {
  return (
    <NextImage
      layout="fill"
      className="h-full w-full object-cover"
      src={thumbnail}
      loading="lazy"
    />
  );
};
