import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import bookRepository from "../repositories/book.repository";

export const bookOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;
  const book = await bookRepository.findOne({
    where: { id },
    relations: { user: true },
  });
  if (admin) return next();

  if (book?.user.id !== sub) {
    throw new AppError(403, "Insufficient permissions");
  }

  return next();
};
