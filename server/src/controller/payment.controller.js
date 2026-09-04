import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getRazorpayOrder,
  getRazorpayPayment,
} from "../services/payment.service.js";

import { prepareOrderData } from "../services/order.service.js";

import Order from "../models/order.js";

import mongoose from "mongoose";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import { calculateOrderTotals } from "../utils/orderCalculation.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get actual cart total from database
    const { totalAmount } = await prepareOrderData(userId);

    // Create unique receipt
    const receipt = `receipt_${userId}_${Date.now()}`;

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: totalAmount,
      receipt,
    });

    res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
};

/**
 * Verify Razorpay payment
 */
export const verifyPayment = async (req, res) => {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    shippingAddress,
  } = req.body;

  const userId = req.user._id;

  try {
    // =====================================================
    // 1. Validate Razorpay response
    // =====================================================

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are missing",
      });
    }

    // =====================================================
    // 2. Verify Razorpay signature
    // =====================================================

    const isValid = verifyRazorpayPayment({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
    // =====================================================
    // 3. Fetch and verify Razorpay order
    // =====================================================

    const razorpayOrder = await getRazorpayOrder(razorpayOrderId);

    // Make sure this Razorpay order belongs to the current user
    if (
      !razorpayOrder.receipt ||
      !razorpayOrder.receipt.startsWith(`receipt_${userId}_`)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay order",
      });
    }

    // Get the current cart total
    const { totalAmount } = await prepareOrderData(userId);

    const expectedAmount = Math.round(totalAmount * 100);

    // Verify Razorpay order amount
    if (razorpayOrder.amount !== expectedAmount) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match order amount",
      });
    }

    // Verify currency
    if (razorpayOrder.currency !== "INR") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment currency",
      });
    }

    // =====================================================
    // 4. Fetch and verify actual Razorpay payment
    // =====================================================

    const razorpayPayment = await getRazorpayPayment(razorpayPaymentId);

    // Make sure the payment belongs to this Razorpay order
    if (razorpayPayment.order_id !== razorpayOrderId) {
      return res.status(400).json({
        success: false,
        message: "Payment does not belong to this Razorpay order",
      });
    }

    // Verify actual payment amount
    if (razorpayPayment.amount !== expectedAmount) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match order amount",
      });
    }

    // Verify payment currency
    if (razorpayPayment.currency !== "INR") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment currency",
      });
    }

    // Payment must be captured before creating the order
    if (razorpayPayment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment has not been captured",
      });
    }
    // =====================================================
    // 5. Prevent duplicate order creation
    // =====================================================

    const existingOrder = await Order.findOne({
      razorpayPaymentId,
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        order: existingOrder,
      });
    }
    // =====================================================
    // 4. Start MongoDB transaction
    // =====================================================

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      // ===================================================
      // 5. Get user's cart
      // ===================================================

      const cart = await Cart.findOne({ user: userId })
        .populate("items.product")
        .session(session);

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // ===================================================
      // 6. Build order items
      // ===================================================

      const orderItems = [];

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

      // ===================================================
      // 7. Calculate totals
      // ===================================================

      const { subtotal, shippingCharge, totalAmount } =
        calculateOrderTotals(orderItems);

      // ===================================================
      // 8. Create paid MongoDB order
      // ===================================================

      const order = await Order.create(
        [
          {
            user: userId,
            items: orderItems,
            shippingAddress,
            subtotal,
            shippingCharge,
            totalAmount,

            paymentMethod: "Razorpay",
            paymentStatus: "Paid",

            razorpayOrderId,
            razorpayPaymentId,

            orderStatus: "Pending",
          },
        ],
        { session },
      );

      // ===================================================
      // 9. Reduce product stock
      // ===================================================

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

      // ===================================================
      // 10. Clear cart
      // ===================================================

      cart.items = [];

      await cart.save({ session });

      // ===================================================
      // 11. Commit transaction
      // ===================================================

      await session.commitTransaction();

      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Payment verified and order created successfully",
        order: order[0],
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Payment verification failed",
    });
  }
};
