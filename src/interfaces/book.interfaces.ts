import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { bookCreateSchema, bookReturnSchema } from "../schemas";
import { Book } from "../entities/book.entity";
type BookCreate = z.infer<typeof bookCreateSchema>;
type BookReturn = z.infer<typeof bookReturnSchema>;
type BookRead = Array<BookReturn>;
type BookUpdate = DeepPartial<Book>;

type AnnoucementRepo = Repository<Book>;

export { BookCreate, BookReturn, AnnoucementRepo, BookRead, BookUpdate };
