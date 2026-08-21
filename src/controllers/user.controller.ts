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
    } catch (err: unknown) {
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
    const { id } = req.params;
    const user = getUserById(Number(id));

    return res.json({
      success: true,
      data: user,
    });
  }

  static updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email }: UserData = req.body;

      const user = updateUserById(Number(id), { firstName, lastName, email });

      return res.json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (err: unknown) {
      next(err);
    }
  }

  static deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      deleteUserById(Number(id));

      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
