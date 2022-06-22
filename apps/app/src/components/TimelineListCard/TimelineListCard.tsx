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
  item: { category, type, opensea, snapshot, poap },
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
        <div className="flex shrink-0 pr-4">
          <Link passHref href={`/${slug}`}>
            <a className="group relative">
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
              {type === "OPENSEA" && opensea && (
                <TimelineBannerNFT data={opensea} />
              )}
              {type === "POAP" && <TimelineBannerPoap />}
              {type === "SNAPSHOT" && snapshot && (
                <TimelineBannerSnapshot data={snapshot} />
              )}
            </>
          }
          date={date}
          ens={ens}
        >
          {type === "OPENSEA" && opensea && (
            <TimelineActionNFT data={opensea} />
          )}
          {type === "POAP" && poap && <TimelineActionPoap data={poap} />}
          {type === "SNAPSHOT" && snapshot && (
            <TimelineActionSnapshot data={snapshot} />
          )}
        </TimelineBanner>
      </div>
      {type === "OPENSEA" && opensea && (
        <TimelineListItemNFT asset={opensea.asset} />
      )}
      {type === "POAP" && poap && (
        <TimelineListItemPoap event={poap?.event} tokenId={poap?.tokenId} />
      )}
      {type === "SNAPSHOT" && snapshot && (
        <TimelineListItemSnapshot vote={snapshot} />
      )}
      <TimelineDigest category={category} />
    </div>
  );
};
