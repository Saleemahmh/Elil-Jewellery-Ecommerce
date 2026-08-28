import slugify from "slugify";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

import { deleteFromCloudinary } from "../utils/cloudinaryDelete.js";

import {
  createCategory as createCategoryService,
  getAllCategories as getAllCategoriesService,
  getCategoryById as getCategoryByIdService,
  getAllCategoriesAdmin as getAllCategoriesAdminService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    let uploadedImage = {
      public_id: "",
      url: "",
    };

    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "elil/categories",
      );
    }
    const categoryData = {
      ...req.body,
      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
      image: uploadedImage,
    };

    const category = await createCategoryService(categoryData);

    return res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await getCategoryByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const existingCategory = await getCategoryByIdService(req.params.id);

    const updateData = {
      ...req.body,
    };

    // ------------------------------------------
    // UPDATE SLUG IF NAME CHANGED
    // ------------------------------------------

    if (req.body.name) {
      updateData.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    // ------------------------------------------
    // REPLACE IMAGE IF NEW IMAGE PROVIDED
    // ------------------------------------------

    if (req.file) {
      // Delete old Cloudinary image
      if (existingCategory.image?.public_id) {
        await deleteFromCloudinary(existingCategory.image.public_id);
      }

      // Upload new image
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "elil/categories",
      );

      updateData.image = uploadedImage;
    }

    const category = await updateCategoryService(req.params.id, updateData);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const existingCategory = await getCategoryByIdService(req.params.id);

    if (existingCategory.image?.public_id) {
      await deleteFromCloudinary(existingCategory.image.public_id);
    }

    await deleteCategoryService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//admin
export const getAdminCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesAdminService();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
