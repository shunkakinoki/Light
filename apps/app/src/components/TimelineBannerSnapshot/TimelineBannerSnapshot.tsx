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
        <a className="group flex-wrap items-center">
          {data?.space?.avatar && (
            <>
              <NextImage
                layout="fixed"
                width={13}
                height={13}
                className="object-cover w-[13px] h-[13px] rounded-lg"
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
          <BadgeCheckIcon className="w-3 h-3 fill-primary" />
        </span>
      )}
    </>
  );
};
