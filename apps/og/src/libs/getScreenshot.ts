import * as playwright from "playwright-aws-lambda";

import { OG_HEIGHT, OG_WIDTH } from "@lightdotso/og/const/config";
import type { FileType } from "@lightdotso/og/types/og";

let _page;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const getOptions = async (isDev: boolean): Promise<any> => {
  let options: any;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: playwright.getChromiumArgs(true),
      headless: true,
    };
  }

  return options;
};

const getPage = async (isDev: boolean): Promise<any> => {
  if (_page) {
    return _page;
  }

  const options = await getOptions(isDev);
  await playwright.loadFont(
    "https://raw.githack.com/googlefonts/noto-cjk/main/Sans/Variable/TTF/NotoSansCJKjp-VF.ttf",
  );
  await playwright.loadFont(
    "https://raw.githack.com/googlefonts/noto-cjk/main/Sans/Variable/TTF/NotoSansCJKsc-VF.ttf",
  );
  await playwright.loadFont(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf",
  );

  const browser = await playwright.launchChromium(options);
  const context = await browser.newContext();
  _page = await context.newPage();

  return _page;
};

export const getScreenshot = async (
  html: string,
  type: FileType,
  isDev: boolean,
): Promise<string | void | Buffer> => {
  const page = await getPage(isDev);
  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
};
