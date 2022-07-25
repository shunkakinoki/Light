// Code from https://github.com/kj455/next-pipe-middleware

import type { NextResponse, NextRequest } from "next/server";

export type FinalResponse = {
  res: NextResponse;
  final: true;
};
export type PipeableMiddleware = (
  req: NextRequest,
  res: NextResponse,
) => Promise<NextResponse | FinalResponse>;

type Option = {
  matcher?: (path: string) => boolean | Promise<boolean>;
};

type PipeMiddleware = (
  req: NextRequest,
  res: NextResponse,
  middlewares: (PipeableMiddleware | [PipeableMiddleware, Option])[],
) => Promise<NextResponse>;

export const pipeMiddleware: PipeMiddleware = async (req, res, middlewares) => {
  if (middlewares.length === 0) {
    return res;
  }
  const [next, ...rest] = middlewares;
  const [middleware, nextMiddlewareOption] =
    typeof next === "function" ? [next, null] : [next[0], next[1]];

  if (
    nextMiddlewareOption?.matcher &&
    nextMiddlewareOption.matcher(req.nextUrl.pathname) === false
  ) {
    return pipeMiddleware(req, res, rest);
  }

  const result = await middleware(req, res);
  if (typeof result !== "undefined" && "final" in result) {
    return result.final ? result.res : pipeMiddleware(req, res, rest);
  }

  return pipeMiddleware(req, result, rest);
};
