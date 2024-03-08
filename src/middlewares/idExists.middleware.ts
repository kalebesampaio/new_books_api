import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/AppError";

export const idExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const foundEntity: User | null = await userRepository.findOneBy({ id });
  if (!foundEntity) throw new AppError(404, "User not found");

  res.locals = { ...res.locals, foundEntity };

  return next();
};
