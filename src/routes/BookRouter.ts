import { Router } from "express";
import middlewares from "../middlewares";
import { BookControllers } from "../controllers/BookControllers";
import { bookCreateSchema } from "../schemas";

export const bookRouter: Router = Router();
const bookController = new BookControllers();

bookRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validateBody(bookCreateSchema),
  bookController.create
);
bookRouter.get("", bookController.get);

bookRouter.get("/:id", middlewares.verifyToken, bookController.retrieve);
bookRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.bookOwner,
  bookController.update
);
bookRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.bookOwner,
  bookController.delete
);
