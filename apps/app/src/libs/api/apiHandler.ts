import type { NextApiResponse, NextApiHandler, NextApiRequest } from "next";

const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

type HttpMethod = typeof httpMethods[number];

const isHttpMethod = (method: string): method is HttpMethod => {
  return httpMethods.some(m => {
    return m === method;
  });
};

type Handlers = {
  [key in HttpMethod]?: NextApiHandler;
};

export const errorHandler = (error: any, res: NextApiResponse) => {
  return res
    .status(500)
    .json({ error: { message: error.message, statusCode: 500 } });
};

export const apiHandler = (handlers: Handlers) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (!method || !isHttpMethod(method)) {
      return res.status(405).json({
        error: {
          message: `Method ${req.method} Not Allowed`,
          statusCode: 405,
        },
      });
    }

    const handler = handlers[method];

    if (!handler) {
      return res.status(405).json({
        error: {
          message: `Method ${req.method} Not Allowed`,
          statusCode: 405,
        },
      });
    }

    try {
      await handler(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
};
