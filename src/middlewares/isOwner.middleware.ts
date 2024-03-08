import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;

  if (admin) return next();

  if (sub !== id) {
    throw new AppError(403, "Insufficient permissions");
  }

  return next();
};
