/* eslint-disable no-empty */

import { Footer } from "@lightdotso/core";
import { fetchPoapEvent, fetchPoapEventTokens } from "@lightdotso/services";
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
import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  eventId: string;
  event?: PoapEvent;
  poaps?: PoapEventTokens;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { eventId },
}: GetStaticPropsContext) => {
  const parsedEventId = parseStringArray(eventId);
  let event: PoapEvent;
  let poaps: PoapEventTokens;

  try {
    const { eventId } = validateQuery(poapEventTokensQuerySchema, {
      eventId: parsedEventId,
    });

    try {
      const eventResult = await fetchPoapEvent(eventId);
      event = validateSchema(poapEventIdSchema, eventResult);
    } catch (e) {}

    try {
      const eventPoapsResult = await fetchPoapEventTokens(
        eventId,
        0,
        NETWORK_PEOPLE_QUERY_NUMBER,
      );
      poaps = validateSchema(poapEventTokensSchema, eventPoapsResult);
    } catch (e) {}

    return {
      props: {
        eventId: parsedEventId,
        event: event ?? null,
        poaps: poaps ?? null,
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
        <Header border={false} />
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
