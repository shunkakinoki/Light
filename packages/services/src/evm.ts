import { Err, Ok } from "neverthrow";

import { resolveEns } from "./ens";
import { resolveAddress } from "./ethers";

export const resolveEVMAddress = async (slug: string) => {
  const ensResult = await resolveEns(slug);
  const addressResult = resolveAddress(slug);
  if (ensResult.isOk()) {
    return new Ok({ ens: slug, address: ensResult.value });
  }
  if (addressResult.isErr()) {
    return new Err("Error parsing address");
  }
  return new Ok({
    ens: null,
    address: addressResult.value,
  });
};
