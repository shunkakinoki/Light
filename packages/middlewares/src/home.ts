import { SocialLinks } from "@lightdotso/const";
import type { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

export const homeMiddleware: ComposableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/home") {
    return NextResponse.redirect(SocialLinks.Website);
  }

  return res;
};
