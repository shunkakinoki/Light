import {
  linksMiddleware,
  composeMiddleware,
  homeMiddleware,
  internalMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [linksMiddleware, homeMiddleware, internalMiddleware],
  });
};

export const config = {
  matcher: ["/:path*"],
};
