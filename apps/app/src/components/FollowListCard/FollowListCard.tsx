import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import type { FollowBannerProps } from "@lightdotso/app/components/FollowBanner";
import { FollowBanner } from "@lightdotso/app/components/FollowBanner";
import type { FollowButtonProps } from "@lightdotso/app/components/FollowButton";
import { FollowButton } from "@lightdotso/app/components/FollowButton";
import { NetworkStack } from "@lightdotso/app/components/NetworkStack";
import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useHover } from "@lightdotso/app/hooks/useHover";

export type FollowListCardProps = {
  id: string;
} & Partial<Pick<FollowButtonProps, "initialStatus">> &
  FollowBannerProps;

export const FollowListCard: FC<FollowListCardProps> = ({
  address,
  id,
  ens: initialEns,
  initialStatus,
}) => {
  const router = useRouter();
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();
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
    <button
      ref={hoverRef}
      className="flex w-full cursor-pointer items-center rounded-lg border border-contrast-lower bg-bg-lighter p-4 hover:bg-bg-light"
      onClick={e => {
        e.preventDefault();
        return router.push(`/${slug}`);
      }}
    >
      <Link passHref href={`/${slug}`}>
        <a className="group relative mr-6 shrink-0">
          <PlaceholderBlur />
          <PlaceholderAvatar
            address={address}
            className="relative h-12 w-12 opacity-100"
          />
        </a>
      </Link>
      <FollowBanner address={address} ens={ens} />
      <div className="relative hidden shrink-0 px-6 py-1 md:inline-flex">
        <NetworkStack disableLoading address={address} id={id} />
      </div>
      <div className="shrink-0 text-contrast-medium">
        <FollowButton address={address} initialStatus={initialStatus} />
      </div>
    </button>
  );
};
