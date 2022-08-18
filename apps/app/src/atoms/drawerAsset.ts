import { atom } from "recoil";

export interface DrawerAsset {
  src: string;
  open: boolean;
  show: boolean;
}

export const drawerAssetAtom = atom<DrawerAsset>({
  key: "drawerAsset",
  default: {
    src: "",
    open: false,
    show: false,
  },
});
