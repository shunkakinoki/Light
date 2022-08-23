import { Footer } from "@lightdotso/core";
import { safeFetchSnapshotSpace } from "@lightdotso/services";
import type { SnapshotSpace } from "@lightdotso/types";
import {
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

import { Auth } from "@lightdotso/app/components/Auth";
import { Header } from "@lightdotso/app/components/Header";
import { Network } from "@lightdotso/app/components/Network";
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
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  const { spaceId } = validateQuery(snapshotSpaceQuerySchema, params);

  const [spaceResult] = await Promise.all([
    safeFetchSnapshotSpace(spaceId)(snapshotSpaceSchema.safeParse),
  ]);

  return {
    props: {
      spaceId: spaceId,
      space: spaceResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const TimelinePage = ({
  spaceId,
  space,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Auth>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize([SwrKeys.SNAPSHOT_SPACE, spaceId])]: space,
          },
        }}
      >
        <Header adaptive border={false} />
        <Network active="Timeline" type="DAO" id={spaceId} />
        <Footer />
      </SWRConfig>
    </Auth>
  );
};

export default TimelinePage;
