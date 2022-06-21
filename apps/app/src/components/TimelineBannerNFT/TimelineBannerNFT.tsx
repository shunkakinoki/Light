import { BadgeCheckIcon } from "@heroicons/react/solid";
import type { OpenseaEvent } from "@lightdotso/types";
import Link from "next/link";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";

export type TimelineBannerNFTProps = {
  data: OpenseaEvent;
};

export const TimelineBannerNFT: FC<TimelineBannerNFTProps> = ({ data }) => {
  const {
    asset_contract: { address: contractAddress },
    collection: { image_url, name, safelist_request_status },
  } = data.asset;

  return (
    <>
      <Link passHref href={`/nft/${contractAddress}`}>
        <a className="group">
          {image_url && (
            <>
              <NextImage
                layout="fixed"
                width={14}
                height={14}
                className="h-3.5 w-3.5 rounded-sm"
                src={image_url}
                loading="lazy"
              />
              &nbsp;
            </>
          )}
          <span className="group-hover:underline">{name}</span>
          &nbsp;
        </a>
      </Link>
      {safelist_request_status === "verified" && (
        <span className="inline-block">
          <BadgeCheckIcon className="h-3 w-3 fill-primary" />
        </span>
      )}
    </>
  );
};
