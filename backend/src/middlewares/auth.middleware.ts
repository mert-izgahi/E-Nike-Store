import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import configs from "../configs";
import { ApiError } from "../lib/api-error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req?.cookies;

  if (!token) {
    return next();
  }

  const decoded = jwt.verify(token, configs.jwtSecret!);

  if (!decoded) {
    return next();
  }

  const currentUserId = (decoded as any).id;
  const currentUserRole = (decoded as any).role;
  if (!currentUserId) {
    return next();
  }

  res.locals.currentUserId = currentUserId;
  res.locals.currentUserRole = currentUserRole;

  return next();
};

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const { currentUserId } = res.locals;
  if (!currentUserId) {
    return next(ApiError.invalidCredentials());
  }

  return next();
};

export const authorizedFor = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { currentUserRole } = res.locals;
    if (!currentUserRole) {
      return next(ApiError.invalidCredentials());
    }

    if (!roles.includes(currentUserRole)) {
      return next(ApiError.invalidCredentials());
    }

    return next();
  };
};
