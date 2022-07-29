import type { ComposableMiddleware } from "next-compose-middleware";

export const basicMiddleware: ComposableMiddleware = async (req, res) => {
  res.cookies.set("foo", "bar");
  return res;
};
