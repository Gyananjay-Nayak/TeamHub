import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUserList);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

export default router;
