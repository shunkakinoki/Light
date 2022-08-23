import { safeFetchPoapToken } from "@lightdotso/services";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  token: PoapToken | null;
  tokenId: string;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { tokenId },
}: GetStaticPropsContext) => {
  const parsedTokenId = parseStringArray(tokenId);
  try {
    const { tokenId } = validateQuery(poapTokenQuerySchema, {
      tokenId: parsedTokenId,
    });

    const tokenResult = await safeFetchPoapToken(tokenId)(
      poapTokenSchema.safeParse,
    );

    return {
      props: {
        token: tokenResult.unwrapOr(null),
        tokenId: tokenId,
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
