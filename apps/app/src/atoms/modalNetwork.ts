import { atom } from "recoil";

export interface ModalNetwork {
  address: string;
  open: boolean;
}

export const modalNetworkAtom = atom<ModalNetwork>({
  key: "modalNetwork",
  default: {
    address: null,
    open: false,
  },
});
