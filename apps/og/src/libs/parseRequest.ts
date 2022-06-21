import type { NextApiRequest } from "next";

import { DEFAULT_CONFIG } from "@lightdotso/og/const/config";
import { getLayoutConfigFromQuery } from "@lightdotso/og/layouts";
import type { IConfig, ILayoutConfig } from "@lightdotso/og/types/og";

export const parseRequest = (req: NextApiRequest): IConfig & ILayoutConfig => {
  const config: IConfig = {
    ...DEFAULT_CONFIG,
    ...req.query,
  };

  const layoutConfig = getLayoutConfigFromQuery(config.layoutName, req.query);

  return {
    ...config,
    ...layoutConfig,
  };
};
