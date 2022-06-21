import { renderToString } from "react-dom/server";

import { layouts } from "@lightdotso/og/layouts";
import type {
  IConfig,
  ILayoutConfig,
  LayoutComponent,
} from "@lightdotso/og/types/og";
import { getCommonCSS } from "@lightdotso/og/utils/css";

const NotImplemented: LayoutComponent = ({ config }) => {
  return <h1 style={{ fontSize: 100 }}>{config.layoutName} not implemented</h1>;
};

export const getHtml = (config: IConfig & ILayoutConfig): string => {
  const layout = layouts.find(l => {
    return l.name === config.layoutName;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const rendered = renderToString(
    layout?.Component != null ? (
      <layout.Component config={config} />
    ) : (
      <NotImplemented config={config} />
    ),
  );

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap">
    <style>
      ${getCommonCSS()}
      ${layout?.getCSS != null ? layout.getCSS(config) : ""}
    </style>
    <body>
      ${rendered}
    </body>
</html>`;
};
