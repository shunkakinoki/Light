import { atom } from "recoil";

export interface DrawerAsset {
  address?: string;
  id?: string;
  type?: "NFT" | "POAP" | "OAT";
  url?: string;
  open: boolean;
  show: boolean;
}

export const drawerAssetAtom = atom<DrawerAsset>({
  key: "drawerAsset",
  default: {
    address: null,
    id: null,
    type: null,
    url: null,
    open: false,
    show: false,
  },
});
