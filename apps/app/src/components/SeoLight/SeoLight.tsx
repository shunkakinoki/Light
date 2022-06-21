import { ApiLinks } from "@lightdotso/const";
import { NextSeo } from "next-seo";
import Head from "next/head";
import type { FC } from "react";

type SeoLightProps = {
  ogpName?: string;
};

export const SeoLight: FC<SeoLightProps> = ({ ogpName }) => {
  return (
    <>
      <Head>
        <title>Light | {ogpName}</title>
      </Head>
      <NextSeo
        titleTemplate={`%s | ${ogpName}`}
        openGraph={{
          locale: "en_US",
          site_name: "light.so",
          type: "website",
          url: "https://light.so",
          images: [
            ogpName
              ? { url: `${ApiLinks.OGP}=${ogpName}` }
              : { url: "https://light.so/ogp.png" },
          ],
        }}
      />
    </>
  );
};
