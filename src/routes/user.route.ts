import express from "express";
import { UserController } from "../controllers/user.controller";

import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/validation";

const router = express.Router();

router.get("/", UserController.getUserList);
router.post("/", validateCreateUser, UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", validateUpdateUser, UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

export default router;
