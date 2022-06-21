import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import type { BaseNFTProps } from "@lightdotso/app/components/BaseNFT";
import { BaseNFT } from "@lightdotso/app/components/BaseNFT";
import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { TimelineListItem } from "@lightdotso/app/components/TimelineListItem";

export type TimelineListItemNFTProps = TimelineListItemProps & BaseNFTProps;

export const TimelineListItemNFT: FC<TimelineListItemNFTProps> = ({
  className,
  asset,
}) => {
  const {
    asset_contract: { address },
    token_id,
  } = asset;

  return (
    <TimelineListItem
      className={clsx(className, "bg-transparent z-0 h-full w-full")}
    >
      <Link passHref href={`/asset/nft/${address}/${token_id}`}>
        <a>
          <BaseNFT asset={asset} />
        </a>
      </Link>
    </TimelineListItem>
  );
};
