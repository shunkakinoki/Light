// Code from: https://github.com/takefumi-yoshii/nextjs-testing-strategy-2022/blob/main/src/errors.ts

export const errors = {
  VALIDATION: { message: "Validation Error", status: 400 },
  INVALID_PATH_PARAM: { message: "Invalid Path Param Error", status: 400 },
  INVALID_PARAMS: { message: "Invalid Params Error", status: 400 },
  INVALID_TYPE: { message: "Invalid Type Error", status: 400 },
  UNAUTHORIZED: { message: "Unauthorized Error", status: 401 },
  FORBIDDEN: { message: "Forbidden Error", status: 403 },
  NOT_FOUND: { message: "Not Found Error", status: 404 },
  METHOD_NOT_ALLOWED: { message: "Method Not Allowed Error", status: 405 },
  CONFLICT: { message: "Conflict Error", status: 409 },
  INTERNAL_SERVER: { message: "Internal Server Error", status: 500 },
  NOT_IMPLEMENTED: { message: "Not Implemented", status: 501 },
};

export class HttpError extends Error {
  status: number = 400;
  constructor(key: keyof typeof errors) {
    super(key);
    this.message = errors[key].message;
    this.status = errors[key].status;
  }
}

export class InvalidPathParamError extends HttpError {
  constructor() {
    super("INVALID_PATH_PARAM");
  }
}

export class InvalidTypeError extends HttpError {
  constructor() {
    super("INVALID_TYPE");
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super("UNAUTHORIZED");
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super("NOT_FOUND");
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor() {
    super("METHOD_NOT_ALLOWED");
  }
}
