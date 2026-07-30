import express from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controller/cart.controller.js";
import protect from "../middleware/auth.middleware.js";
import validateRequest from "../middleware/validateRequest.middleware.js";

import {
  addToCartValidation,
  updateCartValidation,
} from "../validations/cart.validation.js";

const router = express.Router();

//add product to cart

router.post("/", protect, addToCartValidation, validateRequest, addToCart);

//get logged-in User Cart

router.get("/", protect, getCart);

//update product quantity

router.patch(
  "/:productId",
  protect,
  updateCartValidation,
  validateRequest,
  updateCartItem,
);
//remove product from cart
router.delete("/:productId", protect, removeCartItem);

//clear entire cart

router.delete("/", protect, clearCart);

export default router;
