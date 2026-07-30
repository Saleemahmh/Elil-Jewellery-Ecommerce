import {
  addToCart as addToCartService,
  getCart as getCartService,
  updateCartItem as updateCartItemService,
  removeCartItem as removeCartItemService,
  clearCart as clearCartService,
} from "../services/cart.service.js";

//add to cart

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await addToCartService(req.user.id, productId, quantity || 1);
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get logged-in user cart

export const getCart = async (req, res) => {
  try {
    const cart = await getCartService(req.user.id);

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//update quantity

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await updateCartItemService(
      req.user.id,
      req.params.productId,
      quantity,
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//remove productId

export const removeCartItem = async (req, res) => {
  try {
    const cart = await removeCartItemService(req.user.id, req.params.productId);

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//clear cart

export const clearCart = async (req, res) => {
  try {
    const cart = await clearCartService(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
