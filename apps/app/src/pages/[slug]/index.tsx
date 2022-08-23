/* eslint-disable no-empty */

import { Footer } from "@lightdotso/core";
import {
  fetchPoapActions,
  safeFetchOpenseaAssets,
  resolveEns,
  safeFetchPoapActions,
} from "@lightdotso/services";
import type { PoapActions, OpenseaAssets } from "@lightdotso/types";
import { poapActionsSchema, openseaAssetsSchema } from "@lightdotso/types";
import { utils } from "ethers";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { SWRConfig, unstable_serialize } from "swr";

import { Auth } from "@lightdotso/app/components/Auth";
import { Header } from "@lightdotso/app/components/Header";
import { Profile } from "@lightdotso/app/components/Profile";
import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  address: string;
  ens?: string;
  assets: OpenseaAssets | null;
  poaps: PoapActions | null;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  let address: string;
  const parsedSlug = parseStringArray(slug);

  const [ensResult, assetsResult, poapsResult] = await Promise.all([
    resolveEns(parsedSlug),
    safeFetchOpenseaAssets(address, undefined)(openseaAssetsSchema.safeParse),
    safeFetchPoapActions(address)(poapActionsSchema.safeParse),
  ]);

  return {
    props: {
      address: address,
      ens: ensResult.unwrapOr(null),
      assets: assetsResult.unwrapOr(null),
      poaps: poapsResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const SlugPage = ({
  address,
  assets,
  ens,
  poaps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize([SwrKeys.ENS, address])]: ens,
          [unstable_serialize([SwrKeys.OPENSEA_ASSETS, address])]: assets,
          [unstable_serialize([SwrKeys.POAP_ACTIONS, address])]: poaps,
        },
      }}
    >
      <Auth>
        <Header border={false} />
        <Profile address={address} active="Board" />
        <Footer />
      </Auth>
    </SWRConfig>
  );
};

export default SlugPage;
