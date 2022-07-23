import { NextResponse } from "next/server";

import type { PipeableMiddleware } from "./pipe";

export const authMiddleware: PipeableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  const { value: hostValue } = req.cookies.getWithOptions(
    "__Host-next-auth.csrf-token",
  );
  const { value: tokenValue } = req.cookies.getWithOptions(
    "next-auth.csrf-token",
  );
  const hasNextAuthCookie = !!hostValue || !!tokenValue;

  if (pathname === "/" && !hasNextAuthCookie) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return res;
};
