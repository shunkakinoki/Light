import { Footer } from "@lightdotso/core";
import {
  safeFetchPoapEvent,
  safeFetchPoapEventTokens,
} from "@lightdotso/services";
import type { PoapEvent, PoapEventTokens } from "@lightdotso/types";
import {
  poapEventIdSchema,
  poapEventTokensQuerySchema,
  poapEventTokensSchema,
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
  eventId: string;
  event: PoapEvent | null;
  poaps: PoapEventTokens | null;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  const { eventId } = validateQuery(poapEventTokensQuerySchema, params);

  const [eventResult, poapsResult] = await Promise.all([
    safeFetchPoapEvent(eventId)(poapEventIdSchema.safeParse),
    safeFetchPoapEventTokens(
      eventId,
      0,
      NETWORK_PEOPLE_QUERY_NUMBER,
    )(poapEventTokensSchema.safeParse),
  ]);

  return {
    props: {
      eventId: eventId,
      event: eventResult.unwrapOr(null),
      poaps: poapsResult.unwrapOr(null),
    },
    revalidate: 300,
  };
};

export const IndexPage = ({
  eventId,
  event,
  poaps,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Auth>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize([SwrKeys.POAP_EVENT, eventId])]: event,
            [unstable_serialize_infinite(() => {
              return [
                SwrKeys.POAP_EVENT_TOKENS,
                {
                  eventId: eventId,
                  offset: 0,
                  limit: NETWORK_PEOPLE_QUERY_NUMBER,
                },
              ];
            })]: [poaps],
          },
        }}
      >
        <Header adaptive border={false} />
        <Network
          active="Timeline"
          type="POAP"
          id={eventId}
          name={event?.name}
        />
        <Footer />
      </SWRConfig>
    </Auth>
  );
};

export default IndexPage;
