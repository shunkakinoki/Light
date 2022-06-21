import { BadgeCheckIcon } from "@heroicons/react/solid";
import type { SnapshotVote } from "@lightdotso/types";
import Link from "next/link";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";
import { ipfsAddress } from "@lightdotso/app/utils/ipfsAddress";

export type TimelineBannerSnapshotProps = {
  data: SnapshotVote;
};

export const TimelineBannerSnapshot: FC<TimelineBannerSnapshotProps> = ({
  data,
}) => {
  return (
    <>
      <Link passHref href={`/dao/${data?.space?.name}`}>
        <a className="group">
          {data?.space?.avatar && (
            <>
              <NextImage
                layout="fixed"
                className="h-3.5 w-3.5 object-cover"
                width={14}
                height={14}
                src={ipfsAddress(data?.space?.avatar.substring(7))}
                alt={data?.space?.name}
                loading="lazy"
              />
              &nbsp;
            </>
          )}
          <span className="group-hover:underline">{data?.space?.name}</span>
          &nbsp;
        </a>
      </Link>
      {data?.space?.skin === "verified" && (
        <span className="inline-block">
          <BadgeCheckIcon className="h-3 w-3 fill-primary" />
        </span>
      )}
    </>
  );
};
