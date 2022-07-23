import {
  linksMiddleware,
  pipeMiddleware,
  homeMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return pipeMiddleware(req, NextResponse.next(), [
    linksMiddleware,
    homeMiddleware,
  ]);
};

export const config = {
  matcher: ["/:path*"],
};
