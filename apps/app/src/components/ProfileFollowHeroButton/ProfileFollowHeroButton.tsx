import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import type { FC } from "react";

import { useMemo } from "react";

import { useEns } from "@lightdotso/app/hooks/useEns";

type ProfileFollowHeroButtonProps = {
  address?: string;
};

export const ProfileFollowHeroButton: FC<ProfileFollowHeroButtonProps> = ({
  address,
}) => {
  const { ens } = useEns(address);
  const profileSlug = useMemo(() => {
    return ens ?? address;
  }, [address, ens]);

  return (
    <Link href={address ? `/${profileSlug}` : "/"}>
      <a className="rounded-full border border-contrast-lower p-4 hover:bg-bg-light">
        <ArrowLeftIcon className="h-3.5 w-3.5 text-contrast-higher" />
      </a>
    </Link>
  );
};
