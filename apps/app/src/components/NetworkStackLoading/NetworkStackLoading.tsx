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
        "flex h-14 w-full shrink-0 animate-pulse items-center -space-x-0.5 overflow-hidden rounded-full bg-emphasis-medium py-1 pl-2",
        className,
      )}
    >
      <NetworkItemLoading />
    </div>
  );
};
