import { atom } from "recoil";

export interface ModalAsset {
  src: string;
  open: boolean;
  show: boolean;
}

export const modalAssetAtom = atom<ModalAsset>({
  key: "modalAsset",
  default: {
    src: "",
    open: false,
    show: false,
  },
});
