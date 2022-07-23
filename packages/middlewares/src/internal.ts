import { InternalLinks, SocialLinks } from "@lightdotso/const";
import { NextResponse } from "next/server";

import type { PipeableMiddleware } from "./pipe";

export const internalMiddleware: PipeableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  const CapitalizedSlug = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  if (InternalLinks[CapitalizedSlug]) {
    return NextResponse.redirect(
      SocialLinks.Website + InternalLinks[CapitalizedSlug],
    );
  }

  return res;
};
