/* eslint-disable tailwindcss/no-custom-classname */

import { CardBg } from "./CardBg";

import { colourThemes, defaultTheme } from "@lightdotso/og/const/colour";

import type {
  ILayout,
  LayoutComponent,
  GetCSSFn,
} from "@lightdotso/og/types/og";

import { css } from "@lightdotso/og/utils/css";
import { getTheme } from "@lightdotso/og/utils/getTheme";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return css`
    body {
      color: ${colours.fg};
      background: ${colours.bg};
    }

    h1 {
      color: "white";
      font-family: "Space Grotesk", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 84px;
      overflow: hidden;
    }

    .box {
      z-index: 0;
      height: 100%;
      width: 100%;
    }

    .content {
      padding: 48px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    .svg-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  const name = config.Name;

  return (
    <>
      <div className="box">
        <div className="content">
          <h1>{name}</h1>
        </div>
      </div>
      <CardBg className="svg-container" />
    </>
  );
};

export const Card: ILayout = {
  name: "Card",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Name",
      type: "text",
      default: "lightdotso.eth",
      placeholder: "kaki.eth",
    },
  ],
  Component,
  getCSS,
};
