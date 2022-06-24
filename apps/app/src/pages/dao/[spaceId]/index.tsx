/* eslint-disable no-empty */

import { Footer } from "@lightdotso/core";
import { fetchSnapshotSpace, fetchSnapshotVoters } from "@lightdotso/services";
import type { SnapshotSpace, SnapshotVoters } from "@lightdotso/types";
import {
  snapshotVotersSchema,
  snapshotSpaceQuerySchema,
  snapshotSpaceSchema,
} from "@lightdotso/types";
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
import { Network } from "@lightdotso/app/components/Network";
import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { SwrKeys } from "@lightdotso/app/config/SwrKeys";

import { validateQuery } from "@lightdotso/app/libs/api/validateQuery";
import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  spaceId: string;
  space?: SnapshotSpace;
  voters?: SnapshotVoters;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { spaceId },
}: GetStaticPropsContext) => {
  const parsedSpaceId = parseStringArray(spaceId);
  let space: SnapshotSpace;
  let voters: SnapshotVoters;

  try {
    const { spaceId } = validateQuery(snapshotSpaceQuerySchema, {
      spaceId: parsedSpaceId,
    });

    try {
      const spaceResult = await fetchSnapshotSpace(spaceId);
      space = validateSchema(snapshotSpaceSchema, spaceResult);
    } catch (e) {}

    try {
      const votersResult = await fetchSnapshotVoters(
        spaceId,
        NETWORK_PEOPLE_QUERY_NUMBER,
      );
      voters = validateSchema(snapshotVotersSchema, votersResult);
    } catch (e) {}

    return {
      props: {
        spaceId: parsedSpaceId,
        space: space ?? null,
        voters: voters ?? null,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const IndexPage = ({
  spaceId,
  space,
  voters,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Auth>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize([SwrKeys.SNAPSHOT_SPACE, spaceId])]: space,
            [unstable_serialize_infinite(() => {
              return [
                SwrKeys.SNAPSHOT_VOTERS,
                {
                  spaceId: spaceId,
                  first: NETWORK_PEOPLE_QUERY_NUMBER,
                  skip: 0,
                },
              ];
            })]: [voters],
          },
        }}
      >
        <Header border={false} />
        <Network active="People" type="DAO" id={spaceId} />
        <Footer />
      </SWRConfig>
    </Auth>
  );
};

export default IndexPage;
