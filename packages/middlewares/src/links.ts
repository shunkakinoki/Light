import { NotionLinks, SocialLinks } from "@lightdotso/const";
import { NextResponse } from "next/server";

import type { PipeableMiddleware } from "./pipe";

export const linksMiddleware: PipeableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  const CapitalizedSlug = pathname.charAt(1).toUpperCase() + pathname.slice(2);

  if (NotionLinks[CapitalizedSlug]) {
    return NextResponse.redirect(NotionLinks[CapitalizedSlug]);
  }
  if (SocialLinks[CapitalizedSlug]) {
    return NextResponse.redirect(SocialLinks[CapitalizedSlug]);
  }

  return res;
};
