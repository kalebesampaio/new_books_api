import { Request, Response } from "express";
import { BookReturn } from "../interfaces";
import { bookServices } from "../services/BookServices";

export class BookControllers {
  private bookService = new bookServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = res.locals.decoded.sub;
    const book: BookReturn = await this.bookService.create(req.body, userId);

    return res.status(201).json(book);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const books = await this.bookService.get();
    return res.status(200).json(books);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const book = await this.bookService.retrieve(id);

    return res.status(200).json(book);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const book: BookReturn = await this.bookService.update(id, req.body);

    return res.status(200).json(book);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    await this.bookService.destroy(id);
    return res.status(204).json();
  };
}
