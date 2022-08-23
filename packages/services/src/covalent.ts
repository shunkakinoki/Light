import { ApiLinks } from "@lightdotso/const";
import type { CovalentTransactions } from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { safeParse } from "./result";

const ADDRESS = "/address";
const TRANSACTIONS = "/transactions_v2";

export const covalentHeaders = new Headers({
  Authorization:
    "Basic " +
    Buffer.from(process.env.COVALENT_API_KEY + ":").toString("base64"),
});

export const fetchCovalentTransactions = (
  address: string,
  networkId?: number,
  pageNumber?: number,
  pageSize?: number,
): Promise<CovalentTransactions> => {
  return fetcher(
    `${ApiLinks.COVALENT}${
      networkId ?? 1
    }${ADDRESS}/${address}${TRANSACTIONS}/?page-number=${
      pageNumber ?? 0
    }&page-size=${pageSize ?? 30}`,
    {
      headers: covalentHeaders,
    },
  );
};

export const safeFetchCovalentTransactions = (
  address: string,
  networkId?: number,
  pageNumber?: number,
  pageSize?: number,
) => {
  return (validator?: Validator<CovalentTransactions>) => {
    return safeParse<CovalentTransactions>(fetchCovalentTransactions)(
      address,
      networkId,
      pageNumber,
      pageSize,
    )(validator);
  };
};
