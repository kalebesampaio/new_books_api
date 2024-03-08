import "express-async-errors";
import express, { Application, json } from "express";
import helmet from "helmet";
import { GlobalErrors } from "./errors/GlobalErrors";
import { userRouter } from "./routes/UserRouter";
import { sessionRouter } from "./routes/SessionRouter";
import { bookRouter } from "./routes/BookRouter";
import { commentRouter } from "./routes/CommentRouter";
import { assessmentRouter } from "./routes/AssessmentRouter";

const cors = require("cors");

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(json());

const globalErrors = new GlobalErrors();

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/books", bookRouter);
app.use("/books", commentRouter);
app.use("/books", assessmentRouter);

app.use(globalErrors.handleErrors);

export default app;
