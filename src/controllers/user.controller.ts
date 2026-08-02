import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}
export class UserController {
  static userList: Array<{
    firstName: string;
    lastName: string;
    email: string;
    id: number;
  }> = [];
  private static nextId = 1;

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email }: UserData = req.body;
      if (!firstName || !lastName || !email) {
        throw new Error("firstName, lastname and email are required");
      }
      if (!UserController.userList.find((user) => user.email === email)) {
        const user = {
          firstName,
          lastName,
          email,
          id: UserController.nextId++,
        };
        UserController.userList.push(user);
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: user,
        });
      } else {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
          error: "DUPLICATE_EMAIL",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getUserList(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({
        success: true,
        data: UserController.userList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getuserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = UserController.userList.find(
        (user) => user.id === Number(id),
      );
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
      const user = UserController.userList.find(
        (user) => user.id === Number(id),
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND",
        });
      }
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      return res.json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = UserController.userList.find(
        (user) => user.id === Number(id),
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          error: "USER_NOT_FOUND",
        });
      }
      UserController.userList = UserController.userList.filter(
        (user) => user.id !== Number(id),
      );
      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
