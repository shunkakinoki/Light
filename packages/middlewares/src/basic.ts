import type { PipeableMiddleware } from "./pipe";

export const basicMiddleware: PipeableMiddleware = async (req, res) => {
  res.cookies.set("foo", "bar");
  return res;
};
