import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

import { DEFAULT_CONFIG } from "@lightdotso/og/const/config";
import { localStorageEffect } from "@lightdotso/og/libs/effect";
import type { IConfig } from "@lightdotso/og/types/og";

const configState = atom<IConfig>({
  key: "config",
  default: DEFAULT_CONFIG,
  effects_UNSTABLE: [localStorageEffect("config")],
});

export const useConfig = (): [IConfig, SetterOrUpdater<IConfig>] => {
  const [config, setConfig] = useRecoilState(configState);
  return [config, setConfig];
};
