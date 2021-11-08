import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import matchingRouter from "./routers/matchingRouter";
import recommendRouter from "./routers/recommendRouter";
import feedbackRouter from "./routers/feedbackRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/matching", matchingRouter);
app.use("/recommend", recommendRouter);
app.use("/feedback", feedbackRouter);

export default app;
