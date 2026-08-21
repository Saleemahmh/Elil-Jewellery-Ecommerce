import express from "express";

import protect from "../middleware/auth.middleware.js";

import validate from "../middleware/validation.middleware.js";

import { addressValidation } from "../validations/address.validation.js";

import {
  getAddresses,
  getAddress,
  addAddress,
  editAddress,
  removeAddress,
  makeDefaultAddress,
} from "../controller/address.controller.js";

const router = express.Router();

// ======================================================
// ALL ADDRESS ROUTES REQUIRE LOGIN
// ======================================================

router.use(protect);

// Get all addresses
router.get("/", getAddresses);

// Get single address
router.get("/:id", getAddress);

// Create address
router.post("/", addressValidation, validate, addAddress);

// Update address
router.put("/:id", addressValidation, validate, editAddress);

// Delete address
router.delete("/:id", removeAddress);

// Set default address
router.patch("/:id/default", makeDefaultAddress);

export default router;
