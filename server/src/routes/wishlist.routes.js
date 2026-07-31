import express from "express";

import protect from "../middleware/auth.middleware.js";
import validateRequest from "../middleware/validateRequest.middleware.js";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controller/wishlist.controller.js";

import {
  addToWishlistValidation,
  removeFromWishlistValidation,
} from "../validations/wishlist.validation.js";

const router = express.Router();

// Get wishlist
router.get("/", protect, getWishlist);

// Add product to wishlist
router.post(
  "/",
  protect,
  addToWishlistValidation,
  validateRequest,
  addToWishlist,
);

// Remove product from wishlist
router.delete(
  "/:productId",
  protect,
  removeFromWishlistValidation,
  validateRequest,
  removeFromWishlist,
);

export default router;
