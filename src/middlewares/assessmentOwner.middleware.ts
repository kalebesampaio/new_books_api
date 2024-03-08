import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import assessmentRepository from "../repositories/assessment.repository";

export const assessmentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;
  const assessment = await assessmentRepository.findOne({
    where: { id: parseInt(id) },
    relations: { user: true },
  });
  if (admin) return next();

  if (assessment?.user.id !== sub) {
    throw new AppError(403, "Insufficient permissions");
  }

  return next();
};
