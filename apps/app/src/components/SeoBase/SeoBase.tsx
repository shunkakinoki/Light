import Head from "next/head";
import type { FC } from "react";

type SeoBaseProps = {
  base: string;
};

export const SeoBase: FC<SeoBaseProps> = ({ base }) => {
  return (
    <>
      <Head>
        <title>Light | {base}</title>
      </Head>
    </>
  );
};
