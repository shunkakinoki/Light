import clsx from "clsx";
import type { ImageProps, ImageLoaderProps } from "next/image";
import Image from "next/image";
import type { FC } from "react";
import { useState } from "react";

export type NextImageProps = ImageProps & {
  useBlur?: boolean;
};

const normalizeSrc = src => {
  return src.startsWith("/") ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  return `https://lightimage.net/?image=${normalizeSrc(src)}&${paramsString}`;
};

export const NextImage: FC<NextImageProps> = ({
  src,
  alt,
  className,
  useBlur = true,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      loader={cloudflareLoader}
      className={clsx(
        "grayscale duration-300 ease-in-out",
        isLoading && "bg-emphasis-medium animate-pulse",
        useBlur && isLoading
          ? "blur-2xl grayscale scale-110"
          : "blur-0 grayscale-0 scale-100",
        className,
      )}
      src={src}
      alt={alt}
      onLoadingComplete={() => {
        return setLoading(false);
      }}
      {...props}
    />
  );
};
