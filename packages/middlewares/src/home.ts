import { SocialLinks } from "@lightdotso/const";
import { NextResponse } from "next/server";

import type { PipeableMiddleware } from "./pipe";

export const homeMiddleware: PipeableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/home") {
    return NextResponse.redirect(SocialLinks.Website);
  }

  return res;
};
