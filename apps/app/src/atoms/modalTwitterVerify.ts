import { atom } from "recoil";

export interface ModalTwitterVerify {
  open: boolean;
  sig?: string;
  hasTweeted?: boolean;
}

export const modalTwitterVerifyAtom = atom<ModalTwitterVerify>({
  key: "modalTwitterVerify",
  default: {
    open: false,
    sig: null,
    hasTweeted: false,
  },
});
