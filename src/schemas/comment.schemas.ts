import { z } from "zod";
import { userReturnSchema } from "./user.schemas";

const commentSchema = z.object({
  id: z.number().positive(),
  text: z.string().max(240),
  user: userReturnSchema,
});

const commentReadSchema = commentSchema.array();
const commentCreateSchema = z.object({
  text: z.string().max(200),
});

const commentUpdateSchema = commentCreateSchema.partial();

export {
  commentSchema,
  commentCreateSchema,
  commentUpdateSchema,
  commentReadSchema,
};
