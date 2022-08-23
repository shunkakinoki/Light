import { CheckBadgeIcon } from "@heroicons/react/24/solid";
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
      <Link passHref href={`/${contractAddress}`}>
        <a className="group text-center">
          {image_url && (
            <>
              <NextImage
                layout="fixed"
                width={13}
                height={13}
                className="h-[13px] w-[13px] rounded-lg"
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
          <CheckBadgeIcon className="h-3 w-3 fill-primary" />
        </span>
      )}
    </>
  );
};
