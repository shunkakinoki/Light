import type { TimelineItem } from "@lightdotso/types";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";
import { TimelineActionNFT } from "@lightdotso/app/components/TimelineActionNFT";
import { TimelineActionPoap } from "@lightdotso/app/components/TimelineActionPoap";
import { TimelineActionSnapshot } from "@lightdotso/app/components/TimelineActionSnapshot";
import type { TimelineBannerProps } from "@lightdotso/app/components/TimelineBanner";
import { TimelineBanner } from "@lightdotso/app/components/TimelineBanner";
import { TimelineBannerNFT } from "@lightdotso/app/components/TimelineBannerNFT";
import { TimelineBannerPoap } from "@lightdotso/app/components/TimelineBannerPoap";
import { TimelineBannerSnapshot } from "@lightdotso/app/components/TimelineBannerSnapshot";
import { TimelineDigest } from "@lightdotso/app/components/TimelineDigest";
import { TimelineListItemNFT } from "@lightdotso/app/components/TimelineListItemNFT";
import { TimelineListItemPoap } from "@lightdotso/app/components/TimelineListItemPoap";
import { TimelineListItemSnapshot } from "@lightdotso/app/components/TimelineListItemSnapshot";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useHover } from "@lightdotso/app/hooks/useHover";

export type TimelineListCardProps = Omit<TimelineBannerProps, "banner"> & {
  item: TimelineItem;
};

export const TimelineListCard: FC<TimelineListCardProps> = ({
  address,
  date,
  ens: initialEns,
  item: { category, type, data },
}) => {
  const router = useRouter();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { ens } = useEns(address, initialEns);

  const slug = useMemo(() => {
    if (ens) {
      return ens;
    }
    if (address) {
      return address;
    }
  }, [ens, address]);

  useEffect(() => {
    if (isHovered) {
      router.prefetch(`/${slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  return (
    <div
      ref={hoverRef}
      className="flex flex-col w-full rounded-lg border border-contrast-lower bg-bg-lighter p-3"
    >
      <div className="flex pb-1.5 items-center">
        <div className="flex shrink-0">
          <Link passHref href={`/${slug}`}>
            <a className="group relative pr-4">
              <PlaceholderBlur />
              <PlaceholderAvatar
                address={address}
                className="relative h-12 w-12 opacity-100"
              />
            </a>
          </Link>
        </div>
        <TimelineBanner
          address={address}
          banner={
            <>
              {type === "OPENSEA" && //@ts-ignore data.asset && //@ts-ignore
                data.event_type && (
                  <TimelineBannerNFT
                    //@ts-ignore
                    data={data}
                  />
                )}
              {type === "POAP" && (
                <TimelineBannerPoap
                  //@ts-ignore
                  data={data}
                />
              )}
              {type === "SNAPSHOT" && (
                <TimelineBannerSnapshot
                  //@ts-ignore
                  data={data}
                />
              )}
            </>
          }
          date={date}
          ens={ens}
        >
          {
            //@ts-ignore
            type === "OPENSEA" && data?.asset && data?.event_type && (
              <TimelineActionNFT
                address={address}
                //@ts-ignore
                data={data}
              />
            )
          }
          {
            //@ts-ignore
            type === "POAP" && data?.event && data?.tokenId && (
              //@ts-ignore
              <TimelineActionPoap data={data} />
            )
          }
          {
            //@ts-ignore
            type === "SNAPSHOT" && data?.proposal && (
              //@ts-ignore
              <TimelineActionSnapshot data={data} />
            )
          }
        </TimelineBanner>
      </div>
      {
        //@ts-ignore
        type === "OPENSEA" && data?.asset && (
          //@ts-ignore
          <TimelineListItemNFT asset={data.asset} />
        )
      }
      {
        //@ts-ignore
        type === "POAP" && data?.event && (
          //@ts-ignore
          <TimelineListItemPoap event={data.event} tokenId={data.tokenId} />
        )
      }
      {
        //@ts-ignore
        type === "SNAPSHOT" && data?.space && (
          //@ts-ignore
          <TimelineListItemSnapshot vote={data} />
        )
      }
      <TimelineDigest category={category} />
    </div>
  );
};
