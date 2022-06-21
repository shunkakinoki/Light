import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";

import { getHtml } from "@lightdotso/og/libs/getHtml";
import { parseRequest } from "@lightdotso/og/libs/parseRequest";

export const html: NextApiHandler = async (req, res) => {
  try {
    const config = parseRequest(req);
    const html = getHtml(config);
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default withSentry(html);
