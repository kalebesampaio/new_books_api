import { Router } from "express";
import middlewares from "../middlewares";
import { assessmentCreateSchema } from "../schemas";
import { AssessmentControllers } from "../controllers/AssessmentControllers";

export const assessmentRouter: Router = Router();
const assessmentController = new AssessmentControllers();

assessmentRouter.post(
  "/:id/assessments",
  middlewares.verifyToken,
  middlewares.validateBody(assessmentCreateSchema),
  assessmentController.create
);
assessmentRouter.patch(
  "/assessments/:id",
  middlewares.verifyToken,
  middlewares.assessmentOwner,
  assessmentController.update
);
assessmentRouter.delete(
  "/assessments/:id",
  middlewares.verifyToken,
  middlewares.assessmentOwner,
  assessmentController.delete
);
