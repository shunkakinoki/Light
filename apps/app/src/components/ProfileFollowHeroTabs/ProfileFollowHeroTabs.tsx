import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { useMemo } from "react";

import { useEns } from "@lightdotso/app/hooks/useEns";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type ProfileFollowHeroTab = "following" | "followers";

export type ProfileFollowHeroTabsProps = {
  address?: string;
  follow?: ProfileFollowHeroTab;
};

export const ProfileFollowHeroTabs: FC<ProfileFollowHeroTabsProps> = ({
  address,
  follow = "following",
}) => {
  const { address: walletAddress } = useWallet();
  const { ens } = useEns(address);

  const slug = useMemo(() => {
    const slug = address === walletAddress ? "profile" : ens ?? address;
    return slug;
  }, [address, ens, walletAddress]);

  const tabs: {
    name: string;
    href: string;
    follow: ProfileFollowHeroTab;
  }[] = [
    {
      name: "Following",
      href: `/${slug}/following`,
      follow: "following",
    },
    {
      name: "Followers",
      href: `/${slug}/followers`,
      follow: "followers",
    },
  ];

  return (
    <div className="overflow-x-scroll overflow-y-hidden bg-bg-lighter border-b border-contrast-lower">
      <div className="flex justify-center mx-auto">
        <nav
          className="flex justify-center md:justify-start -mb-px space-x-8"
          aria-label="Tabs"
        >
          {tabs.map(tab => {
            return (
              <Link key={tab.name} passHref href={tab.href}>
                <a
                  className={clsx(
                    tab.follow === follow
                      ? "text-contrast-higher border-contrast-high"
                      : "text-contrast-medium hover:text-contrast-higher border-transparent hover:border-contrast-medium",
                    !slug && "pointer-events-none",
                    "group inline-flex items-center py-4 px-3 text-sm font-medium border-b-4",
                  )}
                  aria-current={tab.follow === follow ? "page" : undefined}
                >
                  <span>{tab.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
