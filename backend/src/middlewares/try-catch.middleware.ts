import { Request, Response, NextFunction } from "express";

export const tryCatch = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((e: any) => {
      next(e);
    });
  };
};
