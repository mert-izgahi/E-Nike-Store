import { Request, Response } from "express";
import { ApiError } from "../lib/api-error";
export const notFoundMiddleware = (req: Request, res: Response) => {
  //res.status(404).json({ message: "Route not found", title: "NotFound" });
  const error = ApiError.notFound();
  res.status(error.status).json({
    status: error.status,
    message: error.message,
    title: error.title,
  });
};
