import { Router } from "express";
import middlewares from "../middlewares";
import { commentCreateSchema } from "../schemas";
import { CommentControllers } from "../controllers/CommentControllers";

export const commentRouter: Router = Router();
const commentController = new CommentControllers();

commentRouter.post(
  "/:id/comments",
  middlewares.verifyToken,
  middlewares.validateBody(commentCreateSchema),
  commentController.create
);
commentRouter.patch(
  "/comments/:id",
  middlewares.verifyToken,
  middlewares.commentOwner,
  commentController.update
);
commentRouter.delete(
  "/comments/:id",
  middlewares.verifyToken,
  middlewares.commentOwner,
  commentController.delete
);
