import { ApiLinks } from "@lightdotso/const";
import type { AlchemyTransactions } from "@lightdotso/types";

import { fetcher } from "./fetcher";
import type { Validator } from "./result";
import { safeParse } from "./result";

export const fetchAlchemyTokenTransactions = (address: string) => {
  return fetcher(`${ApiLinks.ALCHEMY}${process.env.ALCHEMY_ID as string}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: address,
          category: [
            "external",
            "internal",
            "token",
            "erc20",
            "erc721",
            "erc1155",
          ],
        },
      ],
    }),
  });
};

export const safeFetchAlchemyTokenTransactions = (address: string) => {
  return (validator?: Validator<AlchemyTransactions>) => {
    return safeParse<AlchemyTransactions>(fetchAlchemyTokenTransactions)(
      address,
    )(validator);
  };
};
