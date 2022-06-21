import { ApiLinks } from "@lightdotso/const";
import { ENS_QUERY, ENS_RESOLVE_NAME_QUERY } from "@lightdotso/queries";
import { ethers } from "ethers";
import { request } from "graphql-request";

export const fetchEnsQuery = (name: string) => {
  return request(ApiLinks.ENS_GRAPH, ENS_QUERY, {
    name: name.toLowerCase(),
    amount: 10,
  });
};

export const fetchEnsResolveNameQuery = (name: string) => {
  return request(ApiLinks.ENS_GRAPH, ENS_RESOLVE_NAME_QUERY, {
    name: name.toLowerCase(),
  });
};

export const resolveEns = async (ens: string) => {
  try {
    const result = await fetchEnsResolveNameQuery(ens);
    return result?.domains?.length > 0
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
