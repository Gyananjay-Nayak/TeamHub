import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import healthRoute from "./routes/health.route";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/v1", (req: Request, res: Response) => {
  return res.json({
    name: "TeamHub API",
    version: "1.0.0",
    status: "running",
  });
});

app.use("/api/v1/health", healthRoute);
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
