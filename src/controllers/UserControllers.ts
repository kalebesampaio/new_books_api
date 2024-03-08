import { Request, Response } from "express";
import { userServices } from "../services/UserServices";
import { UserRead, UserReturn } from "../interfaces";

export class UserControllers {
  private userService = new userServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await this.userService.create(req.body);
    return res.status(201).json(user);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const admin: boolean = res.locals.decoded.admin;
    const users: UserRead = await this.userService.get(admin);

    return res.status(200).json(users);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const user: UserReturn = await this.userService.retrieve(id);
    return res.status(200).json(user);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const user: UserReturn = await this.userService.update(id, req.body);

    return res.status(200).json(user);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    await this.userService.destroy(res.locals.foundEntity);
    return res.status(204).json();
  };
}
