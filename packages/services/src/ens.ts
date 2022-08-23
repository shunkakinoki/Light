import { ApiLinks } from "@lightdotso/const";
import { ENS_QUERY, ENS_RESOLVE_NAME_QUERY } from "@lightdotso/queries";
import type { EnsQuery, EnsResolveNameQuery } from "@lightdotso/types";
import { ethers } from "ethers";
import { request } from "graphql-request";

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

export const resolveEns = async (ens: string) => {
  try {
    const result = await fetchEnsResolveNameQuery(ens);
    return result?.domains?.length
      ? (result?.domains[0]?.resolvedAddress?.id as string)
      : null;
  } catch (err) {
    console.error(err);
  }
  try {
    const provider = new ethers.providers.InfuraProvider(1, {
      projectId: process.env.NEXT_PUBLIC_INFURA_ID as string,
    });
    const address = await provider.resolveName(ens);
    if (address) {
      return address;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
  return null;
};
