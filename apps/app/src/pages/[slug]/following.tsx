import { Footer } from "@lightdotso/common";
import {
  resolveEVMAddress,
  safeFetchCyberconnectFollowings,
} from "@lightdotso/services";
import type { CyberConnectFollowings } from "@lightdotso/types";
import { cyberconnectFollowingsSchema } from "@lightdotso/types";
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
  followings: CyberConnectFollowings | null;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  const parsedSlug = parseStringArray(slug);

  const evmResult = await resolveEVMAddress(parsedSlug);
  if (evmResult.isErr()) {
    return {
      notFound: true,
    };
  }
  const address = evmResult.value.address;
  const ens = evmResult.value?.ens || null;

  const [followingsResult] = await Promise.all([
    safeFetchCyberconnectFollowings(
      address,
      FOLLOW_QUERY_NUMBER,
    )(cyberconnectFollowingsSchema.safeParse),
  ]);

  return {
    props: {
      address: address,
      ens: ens,
      followings: followingsResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const SlugPage = ({
  address,
  ens,
  followings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize([SwrKeys.ENS, address])]: ens,
          [unstable_serialize_infinite(() => {
            return [
              SwrKeys.CYBER_CONNECT_FOLLOWINGS,
              { address: address, first: FOLLOW_QUERY_NUMBER, after: "0" },
            ];
          })]: [followings],
        },
      }}
    >
      <Auth>
        <Header border={false} />
        <Profile address={address} follow="following" />
        <Footer />
      </Auth>
    </SWRConfig>
  );
};

export default SlugPage;
