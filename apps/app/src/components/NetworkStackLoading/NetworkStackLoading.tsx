import clsx from "clsx";
import type { FC } from "react";

import { NetworkItemLoading } from "@lightdotso/app/components/NetworkItemLoading";

type NetworkStackLoadingProps = {
  className?: string;
};

export const NetworkStackLoading: FC<NetworkStackLoadingProps> = ({
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex overflow-hidden shrink-0 items-center py-1 pl-2 -space-x-0.5 w-full h-14 bg-emphasis-medium rounded-full animate-pulse",
        className,
      )}
    >
      <NetworkItemLoading />
    </div>
  );
};
