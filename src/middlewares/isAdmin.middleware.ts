import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const admin: boolean = res.locals.decoded.admin;
  if (!admin) throw new AppError(403, "Insufficient permissions");

  return next();
};
