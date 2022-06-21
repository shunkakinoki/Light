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
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        small &&
          "pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 xl:pt-12 xl:pb-28",
        !small && "py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28",
      )}
    >
      {children}
    </div>
  );
};
