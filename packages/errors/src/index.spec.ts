import { HttpError, InvalidPathParamError, InvalidTypeError } from "./index";

describe("index.ts", () => {
  describe("HttpError", () => {
    test("serialize", () => {
      const error = new HttpError("UNAUTHORIZED");
      expect(error).toMatchObject({
        message: "Unauthorized Error",
        status: 401,
      });
    });
  });
  describe("InvalidPathParamError", () => {
    test("invalid path param", () => {
      const error = new InvalidPathParamError();
      expect(error).toMatchObject({
        message: "Invalid Path Param Error",
        status: 400,
      });
    });
  });
  describe("InvalidTypeError", () => {
    test("invalid type", () => {
      const error = new InvalidTypeError();
      expect(error).toMatchObject({
        message: "Invalid Type Error",
        status: 400,
      });
    });
  });
});
