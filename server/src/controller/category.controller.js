import slugify from "slugify";

import {
  createCategory as createCategoryService,
  getAllCategories as getAllCategoriesService,
  getCategoryById as getCategoryByIdService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    const categoryData = {
      ...req.body,
      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
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
    const updateData = {
      ...req.body,
    };

    if (req.body.name) {
      updateData.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
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
