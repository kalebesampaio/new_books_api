import { Book } from "../entities/book.entity";
import { Comment } from "../entities/comment.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { CommentCreate, CommentReturn, CommentUpdate } from "../interfaces";
import bookRepository from "../repositories/book.repository";
import commentRepository from "../repositories/comment.repository";
import userRepository from "../repositories/user.repository";
import { commentSchema } from "../schemas";
export class commentServices {
  create = async (
    userId: string,
    { text }: CommentCreate,
    id: string
  ): Promise<CommentReturn> => {
    const user: User = (await userRepository.findOneBy({ id: userId }))!;
    const book: Book | null = await bookRepository.findOneBy({
      id,
    });
    if (!book) {
      throw new AppError(404, "Book not found");
    }
    const comment: Comment = commentRepository.create({
      text,
      user,
      book,
    });
    await commentRepository.save(comment);

    return commentSchema.parse(comment);
  };

  update = async (
    id: number,
    commentData: CommentUpdate
  ): Promise<CommentReturn> => {
    const comments = await commentRepository.find();
    const comment = comments.find((c) => c.id === id);
    if (!comment) {
      throw new AppError(404, "Comment not found");
    }
    await commentRepository.update(id, { ...commentData });
    return commentSchema.parse(
      await commentRepository.findOne({
        where: { id },
        relations: { user: true },
      })
    );
  };

  destroy = async (id: Number): Promise<void> => {
    const comments = await commentRepository.find();
    const comment = comments.find((c) => c.id === id);

    if (!comment) {
      throw new AppError(404, "Comment not found");
    }

    await commentRepository.delete(comment!.id);
  };
}
