import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services/SessionServices";

export class SessionControllers {
  private sessionService = new sessionServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const token: SessionReturn = await this.sessionService.create(req.body);
    return res.status(200).json(token);
  };
}
