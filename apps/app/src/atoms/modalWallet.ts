import { atom } from "recoil";

export const modalWalletAtom = atom<boolean>({
  key: "modalWallet",
  default: false,
});
