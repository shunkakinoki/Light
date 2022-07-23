import {
  linksMiddleware,
  pipeMiddleware,
  homeMiddleware,
  internalMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return pipeMiddleware(req, NextResponse.next(), [
    linksMiddleware,
    homeMiddleware,
    internalMiddleware,
  ]);
};

export const config = {
  matcher: ["/:path*"],
};
