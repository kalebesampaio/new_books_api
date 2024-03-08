import { Router } from "express";
import middlewares from "../middlewares";
import { sessionSchema } from "../schemas";
import { SessionControllers } from "../controllers/SessionControllers";

export const sessionRouter: Router = Router();
const sessionController = new SessionControllers();

sessionRouter.post(
  "",
  middlewares.validateBody(sessionSchema),
  sessionController.create
);
