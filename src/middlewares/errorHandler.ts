import { type Request, type Response, type NextFunction } from "express";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.message === "DUPLICATE_EMAIL") {
    return res.status(409).json({
      success: false,
      message: "User with this email already exists",
      error: "DUPLICATE_EMAIL",
    });
  } else if (err.message === "USER_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: "USER_NOT_FOUND",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
}
