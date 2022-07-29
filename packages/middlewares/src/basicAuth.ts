// Code from https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

import type { ComposableMiddleware } from "next-compose-middleware";

export const basicAuthMiddleware: ComposableMiddleware = async (
  req,
  res,
  { breakAll },
) => {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === "4dmin" && pwd === "testpwd123") {
      return res;
    } else {
      return breakAll(res);
    }
  }
};
