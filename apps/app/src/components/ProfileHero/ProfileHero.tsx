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
    <div className="px-3 bg-bg-lighter">
      <div className="flex flex-col md:flex-row sm:items-center py-2 sm:py-3 md:py-8 sm:mx-auto max-w-container">
        <div className="flex flex-row items-center space-x-5">
          {!profileAddress ? (
            <PlaceholderAvatar
              width={96}
              height={96}
              address={KAKI_WALLET_ADDRESS}
              className="shrink-0 w-24 h-24"
            />
          ) : (
            <PlaceholderAvatar
              width={96}
              height={96}
              address={profileAddress}
              className="shrink-0 w-24 h-24"
            />
          )}
          <div className="md:pl-8 sm:mt-6 md:mt-0 space-y-4 md:space-y-6">
            {!profileAddress ? (
              <ProfileHeroAddressLoading />
            ) : (
              <ProfileHeroAddress address={profileAddress} ens={ens} />
            )}
            <div className="hidden sm:inline-flex">
              <ProfileHeroCount
                address={profileAddress}
                isLoading={isLoading}
                followingCount={identity?.followingCount}
                followerCount={identity?.followerCount}
              />
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="inline-flex sm:hidden mt-4">
          <ProfileHeroCount
            address={profileAddress}
            isLoading={isLoading}
            followingCount={identity?.followingCount}
            followerCount={identity?.followerCount}
          />
        </div>
        <div className="flex flex-col-reverse md:flex-col md:mt-0 space-y-4 md:space-y-14">
          <div className="inline-flex sm:hidden mt-4 w-full">
            <FollowButton address={profileAddress} />
          </div>
          <div className="flex justify-start sm:justify-center md:justify-end space-x-4">
            {identity && (
              <ProfileHeroTwitter
                address={profileAddress}
                username={identity?.social.twitter}
              />
            )}
            <ProfileHeroShareButton address={profileAddress} />
            <div className="hidden sm:inline-flex">
              <FollowButton address={profileAddress} />
            </div>
          </div>
          <div className="flex overflow-hidden justify-start sm:justify-center md:justify-end">
            <NetworkStack hidden useBlur={false} address={profileAddress} />
          </div>
        </div>
      </div>
      <ProfileHeroTabs active={active} address={profileAddress} ens={ens} />
    </div>
  );
};
