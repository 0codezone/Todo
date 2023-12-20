import express from "express";
const router = express.Router();
import {
  registerUserContoller,
  loginUserContoller,
} from "../controllers/authController.js";

// #REGISTER--------------
router.post("/register", registerUserContoller);

// #LOGIN -------------------
router.post("/login", loginUserContoller);

export default router;
