import express from "express";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getAdminCategories,
} from "../controller/category.controller.js";
import upload from "../middleware/upload.middleware.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations/category.validation.js";

import validateRequest from "../middleware/validateRequest.middleware.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/categories
 * @desc    Create a category
 * @access  Admin
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createCategoryValidation,
  validateRequest,
  createCategory,
);

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/", getCategories);
/**
 * @route   GET /api/categories/admin
 * @desc    Get a single category
 * @access  Admin
 */
router.get("/admin", protect, authorize("admin"), getAdminCategories);
/**
 * @route   GET /api/categories/:id
 * @desc    Get a single category
 * @access  Public
 */
router.get("/:id", getCategory);

/**
 * @route   PATCH /api/categories/:id
 * @desc    Update category
 * @access  Admin
 */
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateCategoryValidation,
  validateRequest,
  updateCategory,
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete category
 * @access  Admin
 */
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;
