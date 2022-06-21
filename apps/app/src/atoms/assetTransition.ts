import { atom } from "recoil";

export const assetTransitionAtom = atom<boolean>({
  key: "assetTransition",
  default: false,
});
