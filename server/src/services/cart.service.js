import Cart from "../models/cart.js";
import Product from "../models/product.js";

//add product to cart

export const addToCart = async (userId, productId, quantity) => {
  //check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  //check if user has a cart
  let cart = await Cart.findOne({ user: userId });

  //if no cart,create

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });
    return cart;
  }
  //check if product exist in cart
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }
  await cart.save();
  return cart;
};

//get user cart

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    populate: {
      path: "category",
    },
  });
  return cart;
};

//update quantuity

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }
  const item = cart.items.find((item) => item.product.toString() === productId);
  if (!item) {
    throw new Error("Product not found in cart");
  }
  item.quantity = quantity;
  await cart.save();
  return cart;
};

//remove cart

export const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return cart;
};

//clear cart

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};
