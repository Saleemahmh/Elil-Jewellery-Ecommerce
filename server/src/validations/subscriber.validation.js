import { body } from "express-validator";

// Adjust the import above if your project uses a different validation
// library — this assumes express-validator, matching the pattern
// implied by product.routes.js's createProductValidation /
// validateRequest middleware.

export const subscribeValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
];

export const broadcastValidation = [
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];
