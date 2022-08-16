/* eslint-disable no-empty */

import { fetchGalaxyCampaign } from "@lightdotso/services";
import {
  galaxyCampaignQuerySchema,
  galaxyCampaignSchema,
} from "@lightdotso/types";
import type { GalaxyCampaign } from "@lightdotso/types";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { AssetFooter } from "@lightdotso/app/components/AssetFooter";
import { AssetHeader } from "@lightdotso/app/components/AssetHeader";
import { AssetOAT } from "@lightdotso/app/components/AssetOAT";
import { DEAD_ADDRESS } from "@lightdotso/app/dummy";
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
  oat: GalaxyCampaign;
  oatId: string;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { oatId },
}: GetStaticPropsContext) => {
  const parsedOatId = parseStringArray(oatId);
  let oat: GalaxyCampaign;

  try {
    const { oatId } = validateQuery(galaxyCampaignQuerySchema, {
      oatId: parsedOatId,
    });

    try {
      const campaignResult = await fetchGalaxyCampaign(oatId);
      oat = validateSchema(galaxyCampaignSchema, campaignResult);
    } catch (e) {}

    return {
      props: {
        address: DEAD_ADDRESS,
        oat: oat ?? null,
        oatId: parsedOatId,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const OatIdPage = ({
  address,
  oat,
  oatId,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <AssetHeader />
      <AssetOAT address={address} oatId={oatId} oat={oat} />
      <AssetFooter />
    </>
  );
};

export default OatIdPage;
