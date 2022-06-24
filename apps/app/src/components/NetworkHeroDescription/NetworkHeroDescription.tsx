import type { FC } from "react";

export type NetworkHeroDescriptionProps = {
  title: string;
  description?: string;
  people: number;
};

export const NetworkHeroDescription: FC<NetworkHeroDescriptionProps> = ({
  title,
  description,
  people,
}) => {
  return (
    <div className="mt-4 lg:mt-8 text-left">
      <div className="text-2xl md:text-3xl font-bold text-contrast-higher">
        {title}
      </div>
      <p className="mt-4 md:mt-5 text-lg sm:text-base font-semibold leading-7 text-contrast-medium">
        <span className="mr-1 font-extrabold text-contrast-high">
          {people?.toLocaleString()}
        </span>
        People
      </p>
      {description && (
        <p className="overflow-hidden md:pr-6 mt-4 text-base leading-6 text-contrast-medium text-ellipsis break-words line-clamp-3">
          {description}
        </p>
      )}
    </div>
  );
};
