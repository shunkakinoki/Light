import type { FC } from "react";

export type AssetDetailsSegmentHeroProps = {
  name: string;
  collectionName: string;
  description: string;
};

export const AssetDetailsSegmentHero: FC<AssetDetailsSegmentHeroProps> = ({
  name,
  collectionName,
  description,
}) => {
  return (
    <div className="overflow-hidden max-w-xl text-ellipsis break-words">
      <h1 className="mt-6 text-4xl font-extrabold text-contrast-higher line-clamp-3">
        {name}
      </h1>
      <h2 className="mt-6 text-lg leading-4 text-contrast-higher line-clamp-2">
        {collectionName}
      </h2>
      <p className="mt-6 text-base leading-normal text-contrast-medium line-clamp-6">
        {description}
      </p>
    </div>
  );
};
