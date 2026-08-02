import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import healthRoute from "./routes/health.route";
import apiRoute from "./routes/api.route";
import userRoute from "./routes/user.route";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(express.json());

app.use("/api/v1", apiRoute);

app.use("/api/v1/health", healthRoute);
app.use("/api/v1/users", userRoute);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
