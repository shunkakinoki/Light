import type { NetworkType } from "@lightdotso/types";
import { atom } from "recoil";

export const networkTypeAtom = atom<NetworkType>({
  key: "networkType",
  default: "ALL",
});
