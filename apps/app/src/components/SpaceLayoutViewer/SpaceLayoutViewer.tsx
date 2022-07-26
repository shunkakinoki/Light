/* eslint-disable @next/next/no-img-element */

import type { FC } from "react";

import { useSpaceConfigLayout } from "@lightdotso/app/hooks/useSpaceConfigLayout";

export const SpaceLayoutViewer: FC = () => {
  const [configLayout] = useSpaceConfigLayout();

  return (
    <div className="relative flex w-full rounded-md ">
      <img className="absolute z-40" src={`/bazels/black.svg`} alt="black" />
      <img
        className="absolute z-30"
        src={`/lights/${configLayout.Light}.svg`}
        alt="black"
      />
      ;
      <img
        className="absolute z-20 overflow-hidden"
        src={`/spirals/${configLayout.Spiral}.svg`}
        alt="black"
      />
      ;
    </div>
  );
};
