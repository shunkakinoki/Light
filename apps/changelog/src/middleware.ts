import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const redirectPrefixes = [
  "/analytics",
  "/changelog",
  "/docs",
  "/favicon",
  "/member",
  "/home",
];

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const isExcluded = redirectPrefixes.find(path => {
    return pathname?.startsWith(path);
  });

  if (isExcluded) {
    return NextResponse.redirect(`https://light.so${pathname}`);
  }

  return;
};
