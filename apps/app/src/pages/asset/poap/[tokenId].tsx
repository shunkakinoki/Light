/* eslint-disable no-empty */

import { fetchPoapToken } from "@lightdotso/services";
import { poapTokenQuerySchema, poapTokenSchema } from "@lightdotso/types";
import type { PoapToken } from "@lightdotso/types";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { AssetFooter } from "@lightdotso/app/components/AssetFooter";
import { AssetHeader } from "@lightdotso/app/components/AssetHeader";
import { AssetPoap } from "@lightdotso/app/components/AssetPoap";
import { validateQuery } from "@lightdotso/app/libs/api/validateQuery";
import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  tokenId: string;
  token: PoapToken;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { tokenId },
}: GetStaticPropsContext) => {
  const parsedTokenId = parseStringArray(tokenId);
  let token: PoapToken;

  try {
    const { tokenId } = validateQuery(poapTokenQuerySchema, {
      tokenId: parsedTokenId,
    });

    try {
      const tokenResult = await fetchPoapToken(tokenId);
      token = validateSchema(poapTokenSchema, tokenResult);
    } catch (e) {}

    return {
      props: {
        token: token ?? null,
        tokenId: parsedTokenId,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const TokenIdPage = ({
  token,
  tokenId,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <AssetHeader />
      <AssetPoap token={token} tokenId={tokenId} />
      <AssetFooter />
    </>
  );
};

export default TokenIdPage;
