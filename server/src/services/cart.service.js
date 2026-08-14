import Cart from "../models/cart.js";
import Product from "../models/product.js";

// =====================================
// HELPER — GET POPULATED CART
// =====================================

const getPopulatedCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    populate: {
      path: "category",
    },
  });
};

// =====================================
// ADD PRODUCT TO CART
// =====================================

export const addToCart = async (userId, productId, quantity = 1) => {
  // Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // Check stock
  if (product.stock < quantity) {
    throw new Error("Not enough stock available");
  }

  // Find user's cart
  let cart = await Cart.findOne({ user: userId });

  // Create cart if it doesn't exist
  if (!cart) {
    await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });

    return await getPopulatedCart(userId);
  }

  // Check if product already exists
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new Error("Not enough stock available");
    }

    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  // IMPORTANT:
  // Return populated cart so frontend always has
  // product name, price, image, category, etc.
  return await getPopulatedCart(userId);
};

// =====================================
// GET USER CART
// =====================================

export const getCart = async (userId) => {
  return await getPopulatedCart(userId);
};

// =====================================
// UPDATE CART QUANTITY
// =====================================

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    throw new Error("Product not found in cart");
  }

  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  // Check current product stock
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock available");
  }

  item.quantity = quantity;

  await cart.save();

  return await getPopulatedCart(userId);
};

// =====================================
// REMOVE PRODUCT FROM CART
// =====================================

export const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return await getPopulatedCart(userId);
};

// =====================================
// CLEAR CART
// =====================================

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return await getPopulatedCart(userId);
};
