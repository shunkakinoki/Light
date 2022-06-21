import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { Error } from "@lightdotso/app/components/Error";
import { FollowButton } from "@lightdotso/app/components/FollowButton";
import { PlaceholderAvatar } from "@lightdotso/app/components/PlaceholderAvatar";
import { ProfileHeroAddressLoading } from "@lightdotso/app/components/ProfileHeroAddressLoading";
import { ProfileHeroCount } from "@lightdotso/app/components/ProfileHeroCount";
import { ProfileHeroShareButton } from "@lightdotso/app/components/ProfileHeroShareButton";
import { ProfileHeroTabs } from "@lightdotso/app/components/ProfileHeroTabs";
import type { ProfileHeroTabsProps } from "@lightdotso/app/components/ProfileHeroTabs";
import { ProfileHeroTwitter } from "@lightdotso/app/components/ProfileHeroTwitter";
import { KAKI_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useProfileAddress } from "@lightdotso/app/hooks/useProfileAddress";
import { useQueueAddress } from "@lightdotso/app/hooks/useQueueAddress";

export type ProfileHeroProps = { address?: string } & ProfileHeroTabsProps;

const NetworkStack = dynamic(
  () => {
    return import("@lightdotso/app/components/NetworkStack").then(mod => {
      return mod.NetworkStack;
    });
  },
  {
    ssr: false,
  },
);

const ProfileHeroAddress = dynamic(
  () => {
    return import("@lightdotso/app/components/ProfileHeroAddress").then(mod => {
      return mod.ProfileHeroAddress;
    });
  },
  {
    ssr: false,
    loading: () => {
      return <ProfileHeroAddressLoading />;
    },
  },
);

export const ProfileHero: FC<ProfileHeroProps> = ({ active, address }) => {
  const { profileAddress, isLoading: isProfileAddressLoading } =
    useProfileAddress(address);
  const { ens } = useEns(profileAddress);
  useQueueAddress(profileAddress);
  const [hasEnsInitial, setHasEnsInitial] = useState(false);
  const router = useRouter();

  const { identity, isLoading } = useCyberConnectIdentity(profileAddress);

  useEffect(() => {
    if (router.pathname === "/[slug]" && ens && !hasEnsInitial) {
      if (ens) {
        router.replace(`/${ens}`);
        setHasEnsInitial(true);
      }
    }
  }, [router.asPath, ens, router, hasEnsInitial]);

  if (!profileAddress && !isProfileAddressLoading) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="bg-bg-lighter px-3">
      <div className="mx-auto flex max-w-container flex-col items-center py-8 md:flex-row">
        <div className="flex flex-col items-center md:flex-row">
          {!profileAddress ? (
            <PlaceholderAvatar
              width={96}
              height={96}
              address={KAKI_WALLET_ADDRESS}
              className="h-24 w-24 md:h-32 md:w-32"
            />
          ) : (
            <PlaceholderAvatar
              width={96}
              height={96}
              address={profileAddress}
              className="h-24 w-24 md:h-32 md:w-32"
            />
          )}
          <div className="mt-6 space-y-4 md:mt-0 md:space-y-6 md:pl-8">
            {!profileAddress ? (
              <ProfileHeroAddressLoading />
            ) : (
              <ProfileHeroAddress address={profileAddress} ens={ens} />
            )}
            <ProfileHeroCount
              address={profileAddress}
              isLoading={isLoading}
              followingCount={identity?.followingCount}
              followerCount={identity?.followerCount}
            />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col-reverse space-y-4 md:mt-0 md:flex-col md:space-y-14">
          <div className="mt-4 flex justify-center space-x-4 md:justify-end">
            {identity && (
              <ProfileHeroTwitter
                address={profileAddress}
                username={identity?.social.twitter}
              />
            )}
            <ProfileHeroShareButton address={profileAddress} />
            <FollowButton address={profileAddress} />
          </div>
          <div className="flex justify-center md:justify-end">
            <NetworkStack hidden useBlur={false} address={profileAddress} />
          </div>
        </div>
      </div>
      <ProfileHeroTabs active={active} address={profileAddress} ens={ens} />
    </div>
  );
};
