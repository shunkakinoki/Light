import type { ILayoutConfig } from "@lightdotso/og/types/og";

export const getTheme = (config: ILayoutConfig): string => {
  return config.Theme.toLowerCase();
};
