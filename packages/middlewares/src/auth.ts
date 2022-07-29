import type { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

export const authMiddleware: ComposableMiddleware = async (req, res) => {
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
