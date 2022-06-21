import type CyberConnect from "@cyberlab/cyberconnect";
import { atom } from "recoil";

export const cyberConnectAtom = atom<CyberConnect | null>({
  key: "cyberConnect",
  default: null,
});
