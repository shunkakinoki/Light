import type { NextApiHandler } from "next";

import { getHtml } from "@lightdotso/og/libs/getHtml";
import { getScreenshot } from "@lightdotso/og/libs/getScreenshot";
import { parseRequest } from "@lightdotso/og/libs/parseRequest";

const isDev = !process.env.AWS_REGION;

export const image: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    const html = getHtml(config);
    const { fileType } = config;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default image;
