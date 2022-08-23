import { utils } from "ethers";
import { Ok, Err } from "neverthrow";

export const resolveAddress = (slug: string) => {
  if (utils.isAddress(slug)) {
    return new Ok(slug);
  }
  return new Err("Not Address");
};
