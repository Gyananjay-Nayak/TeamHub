import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, email } = req.body;

  if (typeof firstName !== "string" || !firstName.trim()) {
    return next(new AppError("firstName is required", 400, "VALIDATION_ERROR"));
  }
  if (typeof lastName !== "string" || !lastName.trim()) {
    return next(new AppError("lastName is required", 400, "VALIDATION_ERROR"));
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return next(
      new AppError("Invalid or missing email address", 400, "VALIDATION_ERROR"),
    );
  }
  next();
}

export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return next(new AppError("Invalid user id", 400, "INVALID_USER_ID"));
  }
  const { firstName, lastName, email } = req.body;
  if (!firstName && !lastName && !email) {
    return next(
      new AppError("At least one field is required", 400, "VALIDATION_ERROR"),
    );
  }
  if (firstName !== undefined && typeof firstName !== "string") {
    return next(new AppError("invalid firstName", 400, "VALIDATION_ERROR"));
  }
  if (lastName !== undefined && typeof lastName !== "string") {
    return next(new AppError("invalid lastName", 400, "VALIDATION_ERROR"));
  }
  if (email !== undefined) {
    if (typeof email !== "string" || !email.includes("@")) {
      return next(
        new AppError("Invalid email address", 400, "VALIDATION_ERROR"),
      );
    }
  }
  next();
}
