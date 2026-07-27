import express from "express";
import { registerUser } from "../controller/auth.controller.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});
export default router;
