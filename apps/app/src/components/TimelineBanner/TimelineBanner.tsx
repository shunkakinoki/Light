import Link from "next/link";
import type { FC, ReactNode } from "react";

import ReactTimeAgo from "react-time-ago";

import { useEns } from "@lightdotso/app/hooks/useEns";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export type TimelineBannerProps = {
  address: string;
  banner: ReactNode;
  date: Date;
  ens?: string;
};

export const TimelineBanner: FC<TimelineBannerProps> = ({
  children,
  banner,
  address,
  date,
  ens: initialEns,
}) => {
  const { ens, isLoading: isEnsLoading } = useEns(address, initialEns);
  const truncatedAddress = splitAddress(address);
  const slug = isEnsLoading ? truncatedAddress : ens ?? truncatedAddress;

  return (
    <div className="flex flex-col items-start justify-start text-left">
      <p className="break-words text-contrast-medium line-clamp-1">
        <Link passHref href={`/${ens ?? address}`}>
          <a className="text-sm font-medium text-contrast-high hover:underline">
            {slug}
          </a>
        </Link>
        <span className="text-contrast-medium">{"・"}</span>
        <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
        {banner && <span className="text-contrast-medium">{"・"}</span>}
        {banner}
      </p>
      <p className="break-words text-contrast-medium line-clamp-1">
        {children}
      </p>
    </div>
  );
};
