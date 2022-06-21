import { atom } from "recoil";

export const followSnapDefaultAtom = atom<boolean>({
  key: "followSnapDefault",
  default: false,
});
