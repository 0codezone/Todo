import express from "express";
const router = express.Router();
import {
  updateUserController,
  deleteUserController,
  getUserController,
} from "../controllers/userController.js";

// #UPDATE------------------------------------------------
router.put("/:id", updateUserController);

// #DELETE------------------------------------------------
router.delete("/:id", deleteUserController);

// #GET USER------------------------------------------------------
router.get("/:id", getUserController);

export default router;
