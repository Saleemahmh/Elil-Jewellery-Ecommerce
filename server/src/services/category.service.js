import Category from "../models/category.js";

export const createCategory = async (categoryData) => {
  const existingCategory = await Category.findOne({
    name: categoryData.name,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create(categoryData);

  return category;
};

export const getAllCategories = async () => {
  return await Category.find({
    status: "active",
  }).sort({ createdAt: -1 });
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

//admin

export const getAllCategoriesAdmin = async () => {
  return await Category.find().sort({ createdAt: -1 });
};
