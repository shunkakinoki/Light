/* eslint-disable no-empty */

import { Footer } from "@lightdotso/core";
import { resolveEns } from "@lightdotso/services";
import type { PoapActions, OpenseaAssets } from "@lightdotso/types";
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
  assets?: OpenseaAssets;
  poaps?: PoapActions;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  let address: string;
  let ens: string;
  const parsedSlug = parseStringArray(slug);

  try {
    if (parsedSlug.endsWith(".eth")) {
      try {
        address = await resolveEns(parsedSlug);
        ens = parsedSlug;
      } catch (err) {
        return {
          notFound: true,
        };
      }
    } else if (utils.isAddress(parsedSlug)) {
      address = parsedSlug;
    } else {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        address: address,
        ens: ens ?? null,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
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
