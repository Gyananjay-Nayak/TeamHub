import { Request, Response } from "express";

export class HealthController {
  static async healthCheck(req: Request, res: Response) {
    return res.json({
      success: true,
      message: "server is running",
    });
  }
}
