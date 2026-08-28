import slugify from "slugify";

import {
  createCollection as createCollectionService,
  getAllCollections as getAllCollectionsService,
  getCollectionBySlug as getCollectionBySlugService,
  getCollectionById as getCollectionByIdService,
  updateCollection as updateCollectionService,
  deleteCollection as deleteCollectionService,
} from "../services/collection.service.js";

import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { deleteFromCloudinary } from "../utils/cloudinaryDelete.js";

// ======================================================
// CREATE COLLECTION
// ======================================================

export const createCollection = async (req, res) => {
  try {
    let uploadedImage = null;

    // ==========================================
    // UPLOAD COLLECTION IMAGE
    // ==========================================

    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "elil/collections",
      );
    }

    // ==========================================
    // COLLECTION DATA
    // ==========================================

    const collectionData = {
      name: req.body.name,
      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
      description: req.body.description || "",
      isActive:
        req.body.isActive !== undefined
          ? req.body.isActive === "true" || req.body.isActive === true
          : true,
      displayOrder: Number(req.body.displayOrder) || 0,
    };

    if (uploadedImage) {
      collectionData.image = uploadedImage;
    }

    const collection = await createCollectionService(collectionData);

    return res.status(201).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL COLLECTIONS
// ======================================================

export const getCollections = async (req, res) => {
  try {
    // Admin can request inactive collections using:
    // ?includeInactive=true

    const includeInactive = req.query.includeInactive === "true";

    const collections = await getAllCollectionsService(includeInactive);

    return res.status(200).json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET COLLECTION BY SLUG
// ======================================================

export const getCollection = async (req, res) => {
  try {
    const collection = await getCollectionBySlugService(req.params.slug);

    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET COLLECTION BY ID — ADMIN
// ======================================================

export const getAdminCollection = async (req, res) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE COLLECTION
// ======================================================

export const updateCollection = async (req, res) => {
  try {
    const existingCollection = await getCollectionByIdService(req.params.id);

    let updateData = {
      ...req.body,
    };

    // ==========================================
    // UPDATE NAME / SLUG
    // ==========================================

    if (req.body.name) {
      updateData.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    // ==========================================
    // NORMALIZE BOOLEAN
    // ==========================================

    if (req.body.isActive !== undefined) {
      updateData.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }

    // ==========================================
    // NORMALIZE DISPLAY ORDER
    // ==========================================

    if (req.body.displayOrder !== undefined) {
      updateData.displayOrder = Number(req.body.displayOrder);
    }

    // ==========================================
    // UPLOAD NEW IMAGE
    // ==========================================

    if (req.file) {
      // Delete old Cloudinary image
      if (existingCollection.image?.public_id) {
        await deleteFromCloudinary(existingCollection.image.public_id);
      }

      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "elil/collections",
      );

      updateData.image = uploadedImage;
    }

    const collection = await updateCollectionService(req.params.id, updateData);

    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE COLLECTION
// ======================================================

export const deleteCollection = async (req, res) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);

    // ==========================================
    // DELETE CLOUDINARY IMAGE
    // ==========================================

    if (collection.image?.public_id) {
      await deleteFromCloudinary(collection.image.public_id);
    }

    await deleteCollectionService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
