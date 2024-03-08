import { Request, Response } from "express";
import { AssessmentCreate, AssessmentReturn } from "../interfaces";
import { assessmentServices } from "../services/AssessmentServices";

export class AssessmentControllers {
  private assessmentService = new assessmentServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = res.locals.decoded.sub;
    const id: string = req.params.id;
    const rating: AssessmentCreate = req.body;
    const assessment = await this.assessmentService.create(userId, rating, id);

    return res.status(201).json(assessment);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const assessment: AssessmentReturn = await this.assessmentService.update(
      id,
      req.body
    );

    return res.status(200).json(assessment);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    await this.assessmentService.destroy(id);
    return res.status(204).json();
  };
}
