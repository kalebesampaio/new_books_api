import { Assessment } from "../entities/assessment.entity";
import { Book } from "../entities/book.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import {
  AssessmentCreate,
  AssessmentReturn,
  AssessmentUpdate,
} from "../interfaces";
import assessmentRepository from "../repositories/assessment.repository";
import bookRepository from "../repositories/book.repository";
import userRepository from "../repositories/user.repository";
import { assessmentSchema } from "../schemas";

export class assessmentServices {
  create = async (
    userId: string,
    { rating }: AssessmentCreate,
    id: string
  ): Promise<AssessmentReturn> => {
    const user: User = (await userRepository.findOneBy({ id: userId }))!;
    const book: Book | null = await bookRepository.findOneBy({
      id,
    });
    if (!book) {
      throw new AppError(404, "Book not found");
    }
    const asse = await assessmentRepository.findOne({
      relations: { user: true },
      where: { user: user },
    });

    if (asse) {
      await assessmentRepository.update(asse.id, { rating });
      return assessmentSchema.parse(
        await assessmentRepository.findOne({
          relations: { user: true },
          where: { user: user },
        })
      );
    }

    const assessment: Assessment = assessmentRepository.create({
      rating,
      user,
      book,
    });
    await assessmentRepository.save(assessment);

    return assessmentSchema.parse(assessment);
  };

  update = async (
    id: number,
    assessmentData: AssessmentUpdate
  ): Promise<AssessmentReturn> => {
    const a = await assessmentRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!a) {
      throw new AppError(404, "Assessment not found");
    }

    await assessmentRepository.update(id, { ...assessmentData });
    return assessmentSchema.parse(
      await assessmentRepository.findOne({
        where: { id },
        relations: { user: true },
      })
    );
  };

  destroy = async (id: Number): Promise<void> => {
    const assessments = await assessmentRepository.find();
    const assessment = assessments.find((a) => a.id === id);

    if (!assessment) {
      throw new AppError(404, "Assessment not found");
    }

    await assessmentRepository.delete(assessment!.id);
  };
}
