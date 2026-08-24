import mongoose from "mongoose";

import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

import { calculateOrderTotals } from "../utils/orderCalculation.js";

// Create Order
export const createOrder = async (
  userId,
  shippingAddress,
  paymentMethod = "COD",
) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Get User Cart
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems = [];

    // Build Order Items
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        throw new Error("Product no longer exists");
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} has only ${product.stock} item(s) left`,
        );
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || "",
        price: product.discountPrice || product.price,
        quantity: item.quantity,
      });
    }

    // Calculate Totals
    const { subtotal, shippingCharge, totalAmount } =
      calculateOrderTotals(orderItems);

    // Create Order
    const order = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          shippingAddress,
          subtotal,
          shippingCharge,
          totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
          orderStatus: "Pending",
        },
      ],
      { session },
    );

    // Reduce Stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        { session },
      );
    }

    // Clear Cart
    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();

    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

// Get My Orders
export const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({
    createdAt: -1,
  });
};

// Get Order By ID
export const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

// Cancel Order
export const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
    throw new Error("Cannot cancel shipped or delivered orders");
  }

  order.orderStatus = "Cancelled";

  await order.save();

  return order;
};

// Admin - Get All Orders

export const getAllOrders = async () => {
  return await Order.find().populate("user", "fullName email").sort({
    createdAt: -1,
  });
};

// Admin - Update Order Status

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.orderStatus = status;

  await order.save();

  return order;
};

// Admin - Get Single Order
export const getAdminOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate(
    "user",
    "fullName email",
  );

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};
