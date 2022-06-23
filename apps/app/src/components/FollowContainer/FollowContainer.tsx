import clsx from "clsx";
import type { FC } from "react";

type FollowContainerProps = {
  small?: boolean;
};

export const FollowContainer: FC<FollowContainerProps> = ({
  small = false,
  children,
}) => {
  return (
    <div
      className={clsx(
        "px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl",
        small &&
          "pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-10 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-28",
        !small && "py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28",
      )}
    >
      {children}
    </div>
  );
};
