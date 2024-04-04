import { z } from "zod";
import { commentSchema } from "./comment.schemas";
import { assessmentSchema } from "./assessment.schemas";
import { userReturnSchema } from "./user.schemas";

const bookSchema = z.object({
  id: z.string(),
  title: z.string().max(125),
  author: z.string().max(125),
  description: z.string(),
  type: z.string().max(125),
  views: z.number().default(0),
  cover: z.string(),
  launched_in: z.string().max(4),
  isActive: z.boolean().default(true),
  status: z.string().max(60),
  genres: z.string().array(),
  user: userReturnSchema,
  comments: commentSchema.array(),
  assessments: assessmentSchema.array(),
});

const bookCreateSchema = bookSchema.omit({
  id: true,
  isActive: true,
  comments: true,
  assessments: true,
  user: true,
  views: true,
});

const bookReturnSchema = bookSchema;

const bookReadSchema = bookReturnSchema.array();

const bookUpdateSchema = bookCreateSchema.partial();

export {
  bookSchema,
  bookCreateSchema,
  bookReturnSchema,
  bookReadSchema,
  bookUpdateSchema,
};
