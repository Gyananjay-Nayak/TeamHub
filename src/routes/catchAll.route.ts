import express, { Request, Response } from "express";

const router = express.Router();

router.all("/*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default router;
