import { atom } from "recoil";

export const isFirstAtom = atom<boolean>({
  key: "isFirst",
  default: true,
});
