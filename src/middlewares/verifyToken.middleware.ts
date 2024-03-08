import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) throw new AppError(401, "Missing bearer token");

  const [_bearer, token]: Array<string> = authorization.split(" ");

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(404).json({ message: "Invalid token" });
    }
  });
  res.locals = {
    ...res.locals,
    decoded: verify(token, process.env.SECRET_KEY!),
  };

  return next();
};
