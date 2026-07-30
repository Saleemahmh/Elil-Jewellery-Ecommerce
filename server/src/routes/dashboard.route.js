import express from "express";

import {
  getDashboardStats,
  getRecentOrders,
  getMonthlySales,
} from "../controller/dashboard.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

// Dashboard Statistics
router.get("/stats", protect, authorize("admin"), getDashboardStats);

//recent orders
router.get("/recent-orders", protect, authorize("admin"), getRecentOrders);

//Monthly sales
router.get("/monthly-sales", protect, authorize("admin"), getMonthlySales);
export default router;
