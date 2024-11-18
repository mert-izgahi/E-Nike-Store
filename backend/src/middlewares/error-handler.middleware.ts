import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";
import { ApiError } from "../lib/api-error";

export const errorHandlerMiddleware = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  if (error instanceof ApiError) {
    return next(
      res.status(error.status).json({
        status: error.status,
        message: error.message,
        title: error.title,
      })
    );
  }

  return next(
    res.status(500).json({
      status: 500,
      message: "Something went wrong!",
      title: "ERROR",
    })
  );
};
