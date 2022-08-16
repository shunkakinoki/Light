import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useState } from "react";

type FollowContainerProps = {
  address?: string;
};

export const FollowContainer: FC<FollowContainerProps> = ({
  address,
  children,
}) => {
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    setIsSmall(!!address);
  }, [address]);

  return (
    <div
      className={clsx(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        isSmall &&
          "pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 xl:pt-12 xl:pb-28",
        !isSmall && "py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28",
      )}
    >
      {children}
    </div>
  );
};
