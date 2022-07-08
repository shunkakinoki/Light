import { NotionLinks, SocialLinks } from "@lightdotso/const";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const excludedPublicFiles = ["/favicon.svg", "/ogp.png"];
const excludededPrefixes = ["/api"];

export const middleware = (req: NextRequest) => {
  const hostname = req.headers.get("host");
  const pathname = req.nextUrl.pathname;
  const targetHost =
    process.env.NODE_ENV == "production" ? "light.so" : "localhost:3000";
  const url = req.nextUrl.clone();

  const isExcluded = excludededPrefixes.find(path => {
    return pathname?.startsWith(path);
  });
  if (isExcluded) {
    return;
  }

  if (excludedPublicFiles.indexOf(pathname) >= 0) {
    return;
  }

  const CapitalizedSlug = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  if (NotionLinks[CapitalizedSlug]) {
    return NextResponse.redirect(NotionLinks[CapitalizedSlug]);
  }
  if (SocialLinks[CapitalizedSlug]) {
    return NextResponse.redirect(SocialLinks[CapitalizedSlug]);
  }

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

  return;
};
