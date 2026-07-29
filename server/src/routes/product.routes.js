import express from "express";
import upload from "../middleware/upload.middleware.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

import {
  createProductValidation,
  updateProductValidation,
} from "../validations/product.validation.js";

import validateRequest from "../middleware/validateRequest.middleware.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  createProductValidation,
  validateRequest,
  createProduct,
);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  updateProductValidation,
  validateRequest,
  updateProduct,
);

router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
