import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.errorCode,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
}
