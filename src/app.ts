import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import config from "./config";
import { initDB, pool } from "./db";
import { userRouter } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.router";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logges";
import CookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "Next Level",
  });
});

app.use(CookieParser());
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
