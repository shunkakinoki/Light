import clsx from "clsx";
import type { FC } from "react";

export type ProfileBoardItemProps = {
  className?: string;
};

export const ProfileBoardItem: FC<ProfileBoardItemProps> = ({
  children,
  className,
}) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={clsx(
        "aspect-w-1 aspect-h-1 flex flex-wrap overflow-hidden rounded-xl bg-contrast-medium shadow-xl duration-300 hover:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );
};
