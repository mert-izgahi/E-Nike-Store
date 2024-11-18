import { logger } from "../lib/logger";
import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  logger.info(`${method} ${url}`);
  next();
};
