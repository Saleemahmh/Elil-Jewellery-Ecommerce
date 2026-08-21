import { body } from "express-validator";

export const addressValidation = [
  body("label")
    .optional()
    .isIn(["Home", "Work", "Other"])
    .withMessage("Invalid address type"),

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone number must be between 10 and 20 characters"),

  body("addressLine1").trim().notEmpty().withMessage("Address is required"),

  body("addressLine2").optional().trim(),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("state").trim().notEmpty().withMessage("State is required"),

  body("postalCode").trim().notEmpty().withMessage("Postal code is required"),

  body("country").trim().notEmpty().withMessage("Country is required"),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),
];
