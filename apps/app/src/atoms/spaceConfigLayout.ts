import { atom } from "recoil";

import { localStorageEffect } from "@lightdotso/app/libs/recoil/localStorageEffect";

export const spaceConfigLayoutAtom = atom({
  key: "spaceConfigLayout",
  default: {},
  effects_UNSTABLE: [localStorageEffect("spaceConfigLayout")],
});
