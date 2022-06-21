import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export const TimelineBannerPoap: FC = () => {
  return (
    <>
      <NextImage
        layout="fixed"
        width={14}
        height={14}
        className="h-3.5 w-3.5 rounded-sm"
        src={"https://poap.gallery/icons/poap_dark.png"}
        loading="lazy"
      />
      &nbsp; POAP &nbsp;
    </>
  );
};
