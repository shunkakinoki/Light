import { InternalLinks, SocialLinks } from "@lightdotso/const";
import type { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

export const internalMiddleware: ComposableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  const CapitalizedSlug = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  if (InternalLinks[CapitalizedSlug]) {
    return NextResponse.redirect(
      SocialLinks.Website + InternalLinks[CapitalizedSlug],
    );
  }

  return res;
};
