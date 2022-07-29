import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { spaceConfigLayoutAtom } from "@lightdotso/app/atoms/spaceConfigLayout";
import { useSpaceConfig } from "@lightdotso/app/hooks/useSpaceConfig";
import { layouts, getDefaultLayout } from "@lightdotso/app/layouts";
import type { ISpaceConfigLayout } from "@lightdotso/app/types/space";

export const useSpaceConfigLayout = (): [
  ISpaceConfigLayout,
  (layoutConfig: ISpaceConfigLayout) => void,
] => {
  const [spaceConfig, setSpaceConfig] = useRecoilState(spaceConfigLayoutAtom);

  const [config] = useSpaceConfig();
  const { layoutName } = config;

  const spaceLayout = useMemo(() => {
    return layouts.find(l => {
      return l.name === layoutName;
    });
  }, [layoutName]);

  const defaultConfig = useMemo(() => {
    return spaceLayout != null ? getDefaultLayout(spaceLayout) : {};
  }, [spaceLayout]);

  const layoutConfig = spaceConfig[layoutName] ?? {};

  const setSpaceConfigLayout = (config: ISpaceConfigLayout): void => {
    setSpaceConfig(all => {
      return {
        ...all,
        [layoutName]: {
          ...layoutConfig,
          ...config,
        },
      };
    });
  };

  return [
    {
      ...defaultConfig,
      ...layoutConfig,
    },
    setSpaceConfigLayout,
  ];
};
