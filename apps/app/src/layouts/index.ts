import { Bezel } from "./Bezel";
import { Engraving } from "./Engraving";
import { Light } from "./Light";

import type {
  ISpaceLayout,
  ISpaceConfigLayout,
} from "@lightdotso/app/types/space";

export const layouts: ISpaceLayout[] = [Bezel, Engraving, Light];

export const getDefaultLayout = (layout: ISpaceLayout): ISpaceConfigLayout => {
  const config: ISpaceConfigLayout = {};

  for (const p of layout.properties) {
    if (p.default != null) {
      config[p.name] = p.default?.toString();
    }
  }

  return config;
};

export const getLayoutConfigFromQuery = (
  layoutName: string,
  query: Record<string, string | string[]>,
): ISpaceConfigLayout => {
  const layout = layouts.find(l => {
    return l.name === layoutName;
  });

  if (layout == null) {
    return {};
  }

  const config: ISpaceConfigLayout = getDefaultLayout(layout);
  for (const p of layout.properties) {
    if (query[p.name] != null) {
      config[p.name] = query[p.name].toString();
    }
  }

  return config;
};
