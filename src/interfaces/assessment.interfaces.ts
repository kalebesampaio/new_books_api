import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Assessment } from "../entities/assessment.entity";
import { assessmentCreateSchema, assessmentSchema } from "../schemas";

type AssessmentCreate = z.infer<typeof assessmentCreateSchema>;
type AssessmentUpdate = DeepPartial<Assessment>;
type AssessmentReturn = z.infer<typeof assessmentSchema>;
type AssessmentRepo = Repository<Assessment>;

export { AssessmentCreate, AssessmentUpdate, AssessmentReturn, AssessmentRepo };
