import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRouter";
import taskRouter from "./route/taskRouter";

dotenv.config();
const app = express();

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ limit: "10MB" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FrontendAPI as string],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api", taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`we are on port ${PORT}`);
});
