import { Footer } from "@lightdotso/core";
import {
  resolveAddress,
  resolveEns,
  safeFetchCyberconnectFollowers,
} from "@lightdotso/services";
import type { CyberConnectFollowers } from "@lightdotso/types";
import { cyberconnectFollowersSchema } from "@lightdotso/types";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { unstable_serialize as unstable_serialize_infinite } from "swr/infinite";

import { Auth } from "@lightdotso/app/components/Auth";
import { Header } from "@lightdotso/app/components/Header";
import { Profile } from "@lightdotso/app/components/Profile";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  address: string;
  ens: string | null;
  followers: CyberConnectFollowers | null;
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

  const [ensResult, followingsResult] = await Promise.all([
    resolveEns(parsedSlug),
    safeFetchCyberconnectFollowers(
      address,
      FOLLOW_QUERY_NUMBER,
    )(cyberconnectFollowersSchema.safeParse),
  ]);

  return {
    props: {
      address: address,
      ens: ensResult.unwrapOr(null),
      followers: followingsResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const SlugPage = ({
  address,
  ens,
  followers,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize([SwrKeys.ENS, address])]: ens,
          [unstable_serialize_infinite(() => {
            return [
              SwrKeys.CYBER_CONNECT_FOLLOWERS,
              { address: address, first: FOLLOW_QUERY_NUMBER, after: "0" },
            ];
          })]: [followers],
        },
      }}
    >
      <Auth>
        <Header border={false} />
        <Profile address={address} follow="followers" />
        <Footer />
      </Auth>
    </SWRConfig>
  );
};

export default SlugPage;
