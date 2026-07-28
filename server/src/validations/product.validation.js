import { body } from "express-validator";

export const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be greater than or equal to 0"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("bestSeller")
    .optional()
    .isBoolean()
    .withMessage("Best Seller must be true or false"),

  body("newArrival")
    .optional()
    .isBoolean()
    .withMessage("New Arrival must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),
];
export const updateProductValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("shortDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Short description cannot be empty"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be greater than or equal to 0")
    .custom((value, { req }) => {
      if (req.body.price && Number(value) > Number(req.body.price)) {
        throw new Error(
          "Discount price cannot be greater than the original price",
        );
      }

      return true;
    }),

  body("category").optional().isMongoId().withMessage("Invalid category ID"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("bestSeller")
    .optional()
    .isBoolean()
    .withMessage("Best Seller must be true or false"),

  body("newArrival")
    .optional()
    .isBoolean()
    .withMessage("New Arrival must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),
];
