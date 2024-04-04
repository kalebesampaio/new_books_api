import {
  BookCreate,
  BookRead,
  BookReturn,
  BookUpdate,
} from "../interfaces/index";
import bookRepository from "../repositories/book.repository";
import { bookReadSchema, bookReturnSchema } from "../schemas";
import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { Book } from "../entities/book.entity";

export class bookServices {
  create = async (
    bookData: BookCreate,
    userId: string
  ): Promise<BookReturn> => {
    const user: User = (await userRepository.findOne({
      where: { id: userId },
    }))!;
    const book: Book = bookRepository.create({
      ...bookData,
      views: 0,
      user,
      comments: [],
      assessments: [],
    });

    await bookRepository.save(book);

    return bookReturnSchema.parse(book);
  };

  get = async (): Promise<BookRead> => {
    const books = bookReadSchema.parse(
      await bookRepository.find({
        relations: {
          comments: true,
          assessments: true,
        },
      })
    );

    return books;
  };

  retrieve = async (id: string): Promise<BookReturn> => {
    const book = await bookRepository.findOne({
      where: { id },
      relations: { assessments: true, comments: true, user: true },
    });

    if (!book) {
      throw new AppError(404, "Book not found");
    }

    const add = book.views + 1;

    await bookRepository.update(id, { views: add });

    return bookReturnSchema.parse(
      await bookRepository.findOne({
        where: { id },
        relations: { assessments: true, comments: true },
      })
    );
  };

  update = async (id: string, bookData: BookUpdate): Promise<BookReturn> => {
    if (bookData.id) {
      throw new AppError(401, "Field id, views, isActive n cannot be changed");
    }
    if (bookData.isActive) {
      throw new AppError(401, "Field id, views, isActive n cannot be changed");
    }
    if (bookData.views) {
      throw new AppError(401, "Field id, views, isActive n cannot be changed");
    }
    await bookRepository.update(id, { ...bookData });
    return bookReturnSchema.parse(
      await bookRepository.findOne({
        where: { id },
      })
    );
  };

  destroy = async (id: string): Promise<void> => {
    const book = await bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new AppError(404, "Book not found");
    }

    await bookRepository.delete(book.id);
  };
}
