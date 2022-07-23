import { NextResponse } from "next/server";

import type { PipeableMiddleware } from "./pipe";

export const authMiddleware: PipeableMiddleware = async (req, res) => {
  const hostname = req.headers.get("host");
  const pathname = req.nextUrl.pathname;
  const targetHost =
    process.env.NODE_ENV == "production" ? "light.so" : "localhost:3000";
  const url = req.nextUrl.clone();

  if (hostname.endsWith("vercel.app")) {
    return;
  }

  const { value: hostValue } = req.cookies.getWithOptions(
    "__Host-next-auth.csrf-token",
  );
  const { value: tokenValue } = req.cookies.getWithOptions(
    "next-auth.csrf-token",
  );
  const hasNextAuthCookie = !!hostValue || !!tokenValue;

  if (hostname === targetHost && pathname === "/" && !hasNextAuthCookie) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return res;
};
