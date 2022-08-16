import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import type { FC } from "react";

import { useMemo } from "react";

import { useEnsName } from "wagmi";

type ProfileFollowHeroButtonProps = {
  address?: string;
};

export const ProfileFollowHeroButton: FC<ProfileFollowHeroButtonProps> = ({
  address,
}) => {
  const { data: ens } = useEnsName({ address: address });
  const profileSlug = useMemo(() => {
    return ens ?? address;
  }, [address, ens]);

  return (
    <Link href={address ? `/${profileSlug}` : "/profile"}>
      <a className="rounded-full border border-contrast-lower p-4 hover:bg-bg-light">
        <ArrowLeftIcon className="h-3.5 w-3.5 text-contrast-higher" />
      </a>
    </Link>
  );
};
