import { Request, Response } from "express";
import { CommentCreate, CommentReturn } from "../interfaces";
import { commentServices } from "../services/CommentServices";

export class CommentControllers {
  private commentService = new commentServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = res.locals.decoded.sub;
    const id: string = req.params.id;
    const text: CommentCreate = req.body;
    const comment = await this.commentService.create(userId, text, id);

    return res.status(201).json(comment);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const comment: CommentReturn = await this.commentService.update(
      id,
      req.body
    );

    return res.status(200).json(comment);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    await this.commentService.destroy(id);
    return res.status(204).json();
  };
}
