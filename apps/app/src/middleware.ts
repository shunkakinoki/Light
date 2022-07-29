import {
  excludedMiddleware,
  linksMiddleware,
  authMiddleware,
  composeMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [authMiddleware, linksMiddleware, excludedMiddleware],
  });
};

export const config = {
  matcher: ["/:path*"],
};
