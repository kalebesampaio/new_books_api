import { idExists } from "./idExists.middleware";
import { isAdmin } from "./isAdmin.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyToken } from "./verifyToken.middleware";
import { isOwner } from "./isOwner.middleware";
import { commentOwner } from "./commentOwner.middleware";
import { assessmentOwner } from "./assessmentOwner.middleware";
import { bookOwner } from "./bookOwner.middlewares";
export default {
  idExists,
  validateBody,
  uniqueEmail,
  verifyToken,
  isAdmin,
  isOwner,
  commentOwner,
  assessmentOwner,
  bookOwner,
};
