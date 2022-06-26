import type { OpenseaAsset } from "@lightdotso/types";
import type { FC } from "react";

export type BaseNFTProps = { asset: OpenseaAsset };

import { NextImage } from "@lightdotso/app/components/NextImage";

export const BaseNFT: FC<BaseNFTProps> = ({
  asset: {
    animation_original_url,
    animation_url,
    image_original_url,
    image_url,
    name,
  },
}) => {
  if (
    animation_original_url?.endsWith(".mp3") ||
    animation_original_url?.endsWith(".wav") ||
    animation_url?.endsWith(".mp3") ||
    animation_url?.endsWith(".wav")
  ) {
    return (
      <div>
        <NextImage
          layout="fill"
          className="object-contain"
          src={image_url ?? image_original_url}
          alt={name}
          loading="lazy"
        />
        <audio
          controls
          loop
          autoPlay
          muted
          className="absolute bottom-0 w-full"
          src={animation_url ?? animation_original_url}
        />
      </div>
    );
  }

  if (
    animation_url?.endsWith(".mp4") ||
    animation_original_url?.endsWith(".mp4") ||
    animation_url?.endsWith(".mov") ||
    animation_original_url?.endsWith(".mov")
  ) {
    return (
      <div className="flex w-full h-full">
        <video
          controls
          loop
          autoPlay
          muted
          src={animation_url ?? animation_original_url}
        />
      </div>
    );
  }

  if (animation_url) {
    return (
      <div className="flex w-full h-full">
        <iframe
          className="w-full"
          title={name}
          src={animation_url ?? animation_original_url}
        />
      </div>
    );
  }

  if (image_original_url?.endsWith(".webm")) {
    return (
      <div className="flex w-full h-full">
        <video controls autoPlay loop muted>
          <source src={image_url ?? image_original_url} type="video/webm" />
        </video>
      </div>
    );
  }

  if (image_url) {
    return (
      <NextImage
        layout="fill"
        className="object-cover w-full h-full"
        src={image_url ?? image_original_url}
        alt={name}
        loading="lazy"
      />
    );
  }

  if (!name) {
    return (
      <div className="flex justify-center items-center h-full bg-emphasis-high duration-[3000ms] animate-pulse">
        <h1 className="text-xl font-semibold text-center text-contrast-medium">
          Unknown
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-xl font-semibold text-center text-contrast-medium">
        {name}
      </h1>
    </div>
  );
};
