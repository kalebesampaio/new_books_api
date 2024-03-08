import { z } from "zod";

const assessmentSchema = z.object({
  id: z.number().positive(),
  rating: z.number().positive(),
});

const assessmentReadSchema = assessmentSchema.array();
const assessmentCreateSchema = z.object({
  rating: z.number().positive(),
});

const assessmentUpdateSchema = assessmentCreateSchema.partial();

export {
  assessmentSchema,
  assessmentReadSchema,
  assessmentCreateSchema,
  assessmentUpdateSchema,
};
