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
        "flex overflow-hidden flex-wrap bg-contrast-medium rounded-xl shadow-xl duration-300 hover:scale-105 aspect-w-1 aspect-h-1",
        className,
      )}
    >
      {children}
    </div>
  );
};
