import express from "express";
import { ApiController } from "../controllers/api.controller";

const router = express.Router();

router.get("/", ApiController.getApiInfo);

export default router;
