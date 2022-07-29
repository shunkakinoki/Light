import { atom, useRecoilState } from "recoil";
import type { SetterOrUpdater } from "recoil";

import { DEFAULT_SPACE_CONFIG } from "@lightdotso/app/const/space";
import { localStorageEffect } from "@lightdotso/app/libs/recoil/localStorageEffect";
import type { ISpaceConfig } from "@lightdotso/app/types/space";

const configState = atom<ISpaceConfig>({
  key: "config",
  default: DEFAULT_SPACE_CONFIG,
  effects_UNSTABLE: [localStorageEffect("config")],
});

export const useSpaceConfig = (): [
  ISpaceConfig,
  SetterOrUpdater<ISpaceConfig>,
] => {
  const [config, setConfig] = useRecoilState(configState);
  return [config, setConfig];
};
