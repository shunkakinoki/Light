import { SocialLinks } from "@lightdotso/const";
import dynamic from "next/dynamic";
import type { FC } from "react";

import { BannerProfile } from "@lightdotso/app/components/BannerProfile";
import { FollowContainer } from "@lightdotso/app/components/FollowContainer";
import { FollowGrid } from "@lightdotso/app/components/FollowGrid";
import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

const ModalNetwork = dynamic(() => {
  return import("@lightdotso/app/components/ModalNetwork").then(mod => {
    return mod.ModalNetwork;
  });
});

export const FollowHome: FC = () => {
  const { address } = useWallet();

  return (
    <>
      <SeoBase base="Home" />
      <FollowContainer small={!!address}>
        {address && <BannerProfile />}
        <div className="sm:text-center lg:text-left">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-contrast-higher">
            <span className="block xl:inline">Timeline coming soon!</span>
          </h1>
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
          <h1 className="mt-4 md:mt-8 text-3xl md:text-4xl font-extrabold tracking-tight text-contrast-higher">
            <span className="block xl:inline">
              Follow the best people in the metaverse.
            </span>
          </h1>
          <p className="sm:mx-auto lg:mx-0 mt-3 sm:max-w-xl text-base sm:text-lg md:text-xl text-contrast-low">
            Check out the Explore page to find the best people in Light.
          </p>
        </div>
        <FollowGrid />
      </FollowContainer>
      <ModalNetwork />
    </>
  );
};
