import type { ComposableMiddleware } from "next-compose-middleware";

const excludedPrefixes = ["/api"];
const excludedSuffixes = [".png", ".jpg", ".jpeg", ".svg", ".gif"];

export const excludedMiddleware: ComposableMiddleware = async (req, res) => {
  const pathname = req.nextUrl.pathname;

  const isPrefixExcluded = excludedPrefixes.find(path => {
    return pathname?.startsWith(path);
  });
  const isSuffixExcluded = excludedSuffixes.find(path => {
    return pathname?.startsWith(path);
  });
  if (isPrefixExcluded || isSuffixExcluded) {
    return;
  }

  return res;
};
