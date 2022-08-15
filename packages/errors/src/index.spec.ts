import { HttpError } from "./index";

describe("index.ts", () => {
  describe("HttpError", () => {
    test("serialize", () => {
      const error = new HttpError("UNAUTHORIZED");
      expect(error.serialize()).toMatchObject({
        message: "Unauthorized Error",
        status: 401,
      });
    });
  });
});
