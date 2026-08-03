import { NextFunction, Request, Response } from "express";

import {
  createUser,
  deleteUserById,
  getUserList,
  getUserById,
  updateUserById,
} from "../services/user.service";

import { UserData } from "../types/user";

export class UserController {
  static createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email }: UserData = req.body;
      if (!firstName || !lastName || !email) {
        throw new Error("firstName, lastname and email are required");
      }
      const user = createUser({ firstName, lastName, email });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (err: any) {
      if (err.message === "DUPLICATE_EMAIL") {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
          error: "DUPLICATE_EMAIL",
        });
      }
      next(err);
    }
  }

  static getUserList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = getUserList();
      return res.json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  static getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = getUserById(Number(id));
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND",
        });
      }
      return res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email }: UserData = req.body;
      if (!id) {
        return res.status(404).json({
          success: false,
          message: "id is required",
          error: "ID_REQUIRED",
        });
      }
      const user = updateUserById(Number(id), { firstName, lastName, email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND",
        });
      }

      return res.json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "DUPLICATE_EMAIL") {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
          error: "DUPLICATE_EMAIL",
        });
      }
      next(err);
    }
  }

  static deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = deleteUserById(Number(id));
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND",
        });
      }
      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
