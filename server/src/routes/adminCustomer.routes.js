import express from "express";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
  getAllCustomers,
  getCustomerById,
} from "../controller/adminCustomer.controller.js";

const router = express.Router();

// ======================================================
// ADMIN - GET ALL CUSTOMERS
// ======================================================

router.get("/", protect, authorize("admin"), getAllCustomers);

// ======================================================
// ADMIN - GET SINGLE CUSTOMER
// ======================================================

router.get("/:id", protect, authorize("admin"), getCustomerById);

export default router;
