import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  registerUser,
  login,
  getCurrentUser,
} from "../controller/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

// Register User
router.post("/register", registerValidation, validate, registerUser);
//login user
router.post("/login", loginValidation, validate, login);
router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});
export default router;
