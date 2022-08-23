import { ApiLinks } from "@lightdotso/const";
import { ENS_QUERY, ENS_RESOLVE_NAME_QUERY } from "@lightdotso/queries";
import { ensResolveNameQuerySchema } from "@lightdotso/types";
import type { EnsQuery, EnsResolveNameQuery } from "@lightdotso/types";
import { ethers } from "ethers";
import { request } from "graphql-request";
import { ResultAsync } from "neverthrow";

import type { Validator } from "./result";
import { safeParse } from "./result";

export const fetchEnsQuery = (name: string): Promise<EnsQuery> => {
  return request(ApiLinks.ENS_GRAPH, ENS_QUERY, {
    name: name.toLowerCase(),
    amount: 10,
  });
};

export const safeFetchEnsQuery = (name: string) => {
  return (validator?: Validator<EnsQuery>) => {
    return safeParse<EnsQuery>(fetchEnsQuery)(name)(validator);
  };
};

export const fetchEnsResolveNameQuery = (
  name: string,
): Promise<EnsResolveNameQuery> => {
  return request(ApiLinks.ENS_GRAPH, ENS_RESOLVE_NAME_QUERY, {
    name: name.toLowerCase(),
  });
};

export const safeFetchEnsResolveNameQuery = (name: string) => {
  return (validator?: Validator<EnsResolveNameQuery>) => {
    return safeParse<EnsResolveNameQuery>(fetchEnsResolveNameQuery)(name)(
      validator,
    );
  };
};

export const resolveEns = async (name: string) => {
  const queryResult = await safeFetchEnsResolveNameQuery(name)(
    ensResolveNameQuerySchema.safeParse,
  );

  if (!queryResult.isErr()) {
    return queryResult.value;
  }

  const provider = new ethers.providers.InfuraProvider(1, {
    projectId: process.env.NEXT_PUBLIC_INFURA_ID as string,
  });
  const providerResult = await ResultAsync.fromPromise(
    provider.resolveName(name),
    err => {
      return console.error(err);
    },
  );

  return providerResult.unwrapOr(null);
};
