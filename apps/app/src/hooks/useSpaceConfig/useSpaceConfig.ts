import { atom, useRecoilState } from "recoil";
import type { SetterOrUpdater } from "recoil";

import { localStorageEffect } from "@lightdotso/app/libs/recoil/localStorageEffect";

import type { ISpaceConfig } from "@lightdotso/app/types/space";

const configState = atom<ISpaceConfig>({
  key: "config",
  default: null,
  effects_UNSTABLE: [localStorageEffect("config")],
});

export const useSpaceConfig = (): [
  ISpaceConfig,
  SetterOrUpdater<ISpaceConfig>,
] => {
  const [config, setConfig] = useRecoilState(configState);
  return [config, setConfig];
};
