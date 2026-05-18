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

const app: Application = express();

app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "express server",
//     author: "Next Level",
//   });
// });

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRoute);

export default app;
