import { Request, Response } from "express";

export class ApiController {
  static async getApiInfo(req: Request, res: Response) {
    return res.json({
      success: true,
      name: "TeamHub API",
      version: "1.0.0",
      status: "running",
    });
  }
}
