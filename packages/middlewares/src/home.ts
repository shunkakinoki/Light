import { RedirectPrefixes } from "@lightdotso/const";
import type { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

export const homeMiddleware: ComposableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;
  const isExcluded = RedirectPrefixes.find(path => {
    return pathname?.startsWith(path);
  });

  if (isExcluded) {
    return NextResponse.redirect(`https://light.so${pathname}`);
  }

  return res;
};
