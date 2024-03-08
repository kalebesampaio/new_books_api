import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";
import { UserControllers } from "../controllers/UserControllers";

export const userRouter: Router = Router();
const userController = new UserControllers();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.uniqueEmail,
  userController.create
);
userRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.isAdmin,
  userController.get
);

userRouter.get(
  "/:id",
  middlewares.idExists,
  middlewares.verifyToken,
  middlewares.isOwner,
  userController.retrieve
);
userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.uniqueEmail,
  middlewares.idExists,
  middlewares.isOwner,
  userController.update
);
userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.idExists,
  middlewares.isOwner,
  userController.delete
);
