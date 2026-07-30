import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controller/order.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validateRequest from "../middleware/validateRequest.middleware.js";

import {
  createOrderValidation,
  updateOrderStatusValidation,
} from "../validations/order.validation.js";

const router = express.Router();

// Customer Routes

// Place Order
router.post("/", protect, createOrderValidation, validateRequest, createOrder);

// My Orders
router.get("/my-orders", protect, getMyOrders);

// Single Order
router.get("/:id", protect, getOrder);

// Cancel Order
router.patch("/:id/cancel", protect, cancelOrder);

// Admin Routes

// All Orders
router.get("/", protect, authorize("admin"), getAllOrders);

// Update Status
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatusValidation,
  validateRequest,
  updateOrderStatus,
);

export default router;
