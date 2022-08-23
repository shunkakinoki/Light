import { Footer } from "@lightdotso/core";
import { resolveEns, resolveAddress } from "@lightdotso/services";
import type { PoapActions, OpenseaAssets } from "@lightdotso/types";
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
  assets?: OpenseaAssets;
  poaps?: PoapActions;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  const parsedSlug = parseStringArray(slug);

  const addressResult = resolveAddress(parsedSlug);
  if (addressResult.isErr()) {
    return {
      notFound: true,
    };
  }
  const address = addressResult.value;

  const [ensResult] = await Promise.all([resolveEns(parsedSlug)]);

  return {
    props: {
      address: address,
      ens: ensResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const TimelinePage = ({
  address,
  ens,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize([SwrKeys.ENS, address])]: ens,
        },
      }}
    >
      <Auth>
        <Header border={false} />
        <Profile address={address} active="Timeline" />
        <Footer />
      </Auth>
    </SWRConfig>
  );
};

export default TimelinePage;
