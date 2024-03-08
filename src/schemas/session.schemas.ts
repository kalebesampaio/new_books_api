import { userSchema } from "./user.schemas";

const sessionSchema = userSchema.pick({ email: true, password: true });

export { sessionSchema };
