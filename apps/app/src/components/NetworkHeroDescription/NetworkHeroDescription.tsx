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
    <div className="mt-4 lg:mt-8 text-center lg:text-left">
      <div className="text-2xl font-bold text-contrast-higher md:text-3xl">
        {title}
      </div>
      <p className="mt-4 text-lg font-semibold leading-7 text-contrast-medium sm:text-base md:mt-5">
        <span className="mr-1 font-extrabold text-contrast-high">
          {people?.toLocaleString()}
        </span>
        People
      </p>
      {description && (
        <p className="mt-4 overflow-hidden text-ellipsis break-words text-base leading-6 text-contrast-medium line-clamp-6 md:pr-6">
          {description}
        </p>
      )}
    </div>
  );
};
