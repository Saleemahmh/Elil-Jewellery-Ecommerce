import { body } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description cannot exceed 300 characters"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),
];
export const updateCategoryValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description cannot exceed 300 characters"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),
];
