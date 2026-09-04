import crypto from "node:crypto";

import razorpay from "../config/razorpay.js";

/**
 * Create a Razorpay order
 *
 * Razorpay expects the amount in the smallest currency unit.
 * For INR:
 *
 * ₹100 = 10000 paise
 */
export const createRazorpayOrder = async ({ amount, receipt }) => {
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt,
  });

  return razorpayOrder;
};

/**
 * Verify Razorpay payment signature
 */
export const verifyRazorpayPayment = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(razorpaySignature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};
/**
 * Fetch Razorpay order details
 */
export const getRazorpayOrder = async (razorpayOrderId) => {
  return await razorpay.orders.fetch(razorpayOrderId);
};

/**
 * Fetch Razorpay payment details
 */
export const getRazorpayPayment = async (razorpayPaymentId) => {
  return await razorpay.payments.fetch(razorpayPaymentId);
};
