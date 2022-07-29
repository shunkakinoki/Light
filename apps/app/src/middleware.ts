import {
  excludedMiddleware,
  linksMiddleware,
  authMiddleware,
  basicAuthMiddleware,
  composeMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [authMiddleware, linksMiddleware, excludedMiddleware],
    "/space/config": {
      scripts: [basicAuthMiddleware],
    },
  });
};

export const config = {
  matcher: ["/:path*"],
};
