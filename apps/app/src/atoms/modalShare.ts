import { atom } from "recoil";

import type { ModalType } from "@lightdotso/app/types/modal";

export interface ModalShare {
  address?: string;
  name: string;
  type: ModalType;
  open: boolean;
}

export const modalShareAtom = atom<ModalShare>({
  key: "modalShare",
  default: {
    address: null,
    name: null,
    type: null,
    open: false,
  },
});
