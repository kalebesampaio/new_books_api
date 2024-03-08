import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { commentCreateSchema, commentSchema } from "../schemas";

type CommentCreate = z.infer<typeof commentCreateSchema>;
type CommentUpdate = DeepPartial<Comment>;
type CommentReturn = z.infer<typeof commentSchema>;
type CommentRepo = Repository<Comment>;

export { CommentCreate, CommentRepo, CommentUpdate, CommentReturn };
