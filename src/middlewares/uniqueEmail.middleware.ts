import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/AppError";
import { GlobalErrors } from "../errors/GlobalErrors";

export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const globalError = new GlobalErrors();
  try {
    const data = req.body;
    const users = await userRepository.find({
      withDeleted: true,
    });

    const emailAlredyExist = users.find((u) => u.email === data.email);
    if (emailAlredyExist) {
      throw new AppError(409, "Email Alredy Exists");
    }
    next();
  } catch (err) {
    if (err instanceof AppError) {
      globalError.handleErrors(err, req, res, next);
    }
  }
};
