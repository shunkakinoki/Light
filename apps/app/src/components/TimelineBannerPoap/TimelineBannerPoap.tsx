import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export const TimelineBannerPoap: FC = () => {
  return (
    <>
      <NextImage
        layout="fixed"
        width={13}
        height={13}
        className="w-[13px] h-[13px] rounded-lg"
        src={"https://poap.gallery/icons/poap_dark.png"}
        loading="lazy"
      />
      &nbsp; POAP &nbsp;
    </>
  );
};
