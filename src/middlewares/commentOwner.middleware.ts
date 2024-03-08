import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import commentRepository from "../repositories/comment.repository";

export const commentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;
  const comment = await commentRepository.findOneBy({
    id: parseInt(id),
  });
  if (admin) return next();

  if (comment?.user.id !== sub) {
    throw new AppError(403, "Insufficient permissions");
  }

  return next();
};
