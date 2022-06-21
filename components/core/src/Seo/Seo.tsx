import { DefaultSeo } from "next-seo";
import Head from "next/head";
import type { FC } from "react";

export const Seo: FC = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DefaultSeo
        title="Light | The Metaverse Explorer"
        canonical="https://light.so"
        description="Light enables you to discover connections that weren't possible before. With Light, you can discover mutual DAOs you have contributed with, gather around your mutual NFT collections, and see past common POAP events that you have attended to. Users can also see an aggregated profile of activity that is associated with your wallet, visualizing their identity in the metaverse."
        openGraph={{
          locale: "en_US",
          site_name: "light.so",
          type: "website",
          url: "https://light.so",
          images: [{ url: "https://light.so/ogp.png" }],
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@LightDotSo",
          site: "@LightDotSo",
        }}
      />
    </>
  );
};
