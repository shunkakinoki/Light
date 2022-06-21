/* eslint-disable no-empty */

import { fetchOpenseaAsset } from "@lightdotso/services";
import { openseaAssetQuerySchema, openseaAssetSchema } from "@lightdotso/types";
import type { OpenseaAsset } from "@lightdotso/types";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { AssetFooter } from "@lightdotso/app/components/AssetFooter";
import { AssetHeader } from "@lightdotso/app/components/AssetHeader";
import { AssetNFT } from "@lightdotso/app/components/AssetNFT";
import { validateQuery } from "@lightdotso/app/libs/api/validateQuery";
import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  address: string;
  tokenId: string;
  asset?: OpenseaAsset;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  let asset: OpenseaAsset;

  const { address, tokenId } = validateQuery(openseaAssetQuerySchema, params);

  try {
    const result = await fetchOpenseaAsset(address, tokenId);
    asset = validateSchema(openseaAssetSchema, result);
  } catch (e) {}

  return {
    props: {
      asset: asset ?? null,
      address: address,
      tokenId: tokenId,
    },
    revalidate: 300,
  };
};

export const TokenIdPage = ({
  address,
  tokenId,
  asset,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <AssetHeader />
      <AssetNFT asset={asset} address={address} tokenId={tokenId} />
      <AssetFooter />
    </>
  );
};

export default TokenIdPage;
