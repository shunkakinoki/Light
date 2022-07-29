import type { ComponentType } from "react";

export interface ISpaceConfig {
  layoutName: string;
}

export type ISpaceConfigLayoutValue = string;
export type ISpaceConfigLayout = Record<string, ISpaceConfigLayoutValue>;

export type SpaceLayoutConfigComponent = ComponentType<{
  config: ISpaceConfig & ISpaceConfigLayout;
}>;

export interface ISpaceBaseLayoutProperty {
  name: string;
  description?: string;
}

export type ISpaceLayoutProperty = ISpaceBaseLayoutProperty &
  (
    | {
        type: "text";
        default?: string;
        placeholder?: string;
      }
    | {
        type: "number";
        default?: string;
        placeholder?: string;
      }
    | {
        type: "select";
        options: string[];
        default?: string;
      }
  );

export interface ISpaceLayout {
  name: string;
  properties: ISpaceLayoutProperty[];
}
