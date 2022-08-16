import { SocialLinks } from "@lightdotso/const";
import dynamic from "next/dynamic";
import type { FC } from "react";

import { FollowContainer } from "@lightdotso/app/components/FollowContainer";
import { FollowGrid } from "@lightdotso/app/components/FollowGrid";
import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

const ModalNetwork = dynamic(() => {
  return import("@lightdotso/app/components/ModalNetwork").then(mod => {
    return mod.ModalNetwork;
  });
});

const BannerProfile = dynamic(
  () => {
    return import("@lightdotso/app/components/BannerProfile").then(mod => {
      return mod.BannerProfile;
    });
  },
  { ssr: false },
);

export const FollowHome: FC = () => {
  const { address } = useWallet();

  return (
    <>
      <SeoBase base="Home" />
      <FollowContainer address={address}>
        {address && <BannerProfile />}
        <div className="sm:text-center lg:text-left">
          <div className="mt-3">
            <a
              className="text-primary hover:underline"
              href={SocialLinks.Discord}
              target="_blank"
              rel="noreferrer"
            >
              Join discord community
            </a>
            <span className="text-contrast-higher">・</span>
            <a
              className="text-primary hover:underline"
              href={SocialLinks.Twitter}
              target="_blank"
              rel="noreferrer"
            >
              Follow us on Twitter
            </a>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-contrast-higher md:mt-8 md:text-4xl">
            <span className="block xl:inline">
              Follow the best people in the metaverse.
            </span>
          </h1>
          <p className="mt-3 text-base text-contrast-low sm:mx-auto sm:max-w-xl sm:text-lg md:text-xl lg:mx-0">
            Check out the Explore page to find the best people in Light.
          </p>
        </div>
        <FollowGrid />
      </FollowContainer>
      <ModalNetwork />
    </>
  );
};
