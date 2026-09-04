import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controller/payment.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/razorpay/create-order", protect, createPaymentOrder);

router.post("/razorpay/verify", protect, verifyPayment);

export default router;
