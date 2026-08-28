import express from "express";

import upload from "../middleware/upload.middleware.js";

import {
  createCollection,
  getCollections,
  getCollection,
  getAdminCollection,
  updateCollection,
  deleteCollection,
} from "../controller/collection.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

// ======================================================
// PUBLIC — GET ACTIVE COLLECTIONS
// ======================================================

router.get("/", getCollections);

// ======================================================
// PUBLIC — GET COLLECTION BY SLUG
// ======================================================

router.get("/:slug", getCollection);

// ======================================================
// ADMIN — GET COLLECTION BY ID
// ======================================================

router.get("/admin/:id", protect, authorize("admin"), getAdminCollection);

// ======================================================
// ADMIN — CREATE COLLECTION
// ======================================================

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createCollection,
);

// ======================================================
// ADMIN — UPDATE COLLECTION
// ======================================================

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateCollection,
);

// ======================================================
// ADMIN — DELETE COLLECTION
// ======================================================

router.delete("/:id", protect, authorize("admin"), deleteCollection);

export default router;
