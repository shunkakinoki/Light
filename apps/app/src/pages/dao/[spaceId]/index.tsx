import { Footer } from "@lightdotso/common";
import {
  safeFetchSnapshotSpace,
  safeFetchSnapshotVoters,
} from "@lightdotso/services";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  spaceId: string;
  space: SnapshotSpace | null;
  voters: SnapshotVoters | null;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  const { spaceId } = validateQuery(snapshotSpaceQuerySchema, params);

  const [spaceResult, votersResult] = await Promise.all([
    safeFetchSnapshotSpace(spaceId)(snapshotSpaceSchema.safeParse),
    safeFetchSnapshotVoters(
      spaceId,
      NETWORK_PEOPLE_QUERY_NUMBER,
    )(snapshotVotersSchema.safeParse),
  ]);

  return {
    props: {
      spaceId: spaceId,
      space: spaceResult.unwrapOr(null),
      voters: votersResult.unwrapOr(null),
    },
    revalidate: 300,
  };
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
        <Header adaptive border={false} />
        <Network active="People" type="DAO" id={spaceId} />
        <Footer />
      </SWRConfig>
    </Auth>
  );
};

export default IndexPage;
