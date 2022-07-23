import {
  excludedMiddleware,
  linksMiddleware,
  homeMiddleware,
  pipeMiddleware,
} from "@lightdotso/middlewares";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  return pipeMiddleware(req, NextResponse.next(), [
    excludedMiddleware,
    linksMiddleware,
    homeMiddleware,
  ]);
};
