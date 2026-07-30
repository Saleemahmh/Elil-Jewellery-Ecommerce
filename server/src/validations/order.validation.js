import { body } from "express-validator";
// Create Order Validation

export const createOrderValidation = [
  body("shippingAddress.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("shippingAddress.addressLine1")
    .trim()
    .notEmpty()
    .withMessage("Address Line 1 is required"),

  body("shippingAddress.addressLine2").optional().trim(),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal Code is required"),

  body("shippingAddress.country").optional().trim(),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "Razorpay"])
    .withMessage("Invalid payment method"),
];

// Update Order Status Validation
export const updateOrderStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ])
    .withMessage("Invalid order status"),
];
