import { atom } from "recoil";

import { localStorageEffect } from "@lightdotso/app/libs/recoil/localStorageEffect";
import type { ISpaceConfig } from "@lightdotso/app/types/space";

export const spaceConfigAtom = atom<ISpaceConfig>({
  key: "spaceConfig",
  default: null,
  effects_UNSTABLE: [localStorageEffect("spaceConfig")],
});
