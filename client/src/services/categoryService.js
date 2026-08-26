import api from "./axios";

// Get all categories
export const getCategories = async (params = {}) => {
  const response = await api.get("/categories", {
    params,
  });

  return response.data;
};
// ============================================
// GET SINGLE CATEGORY
// ============================================

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);

  return response.data;
};

// ============================================
// CREATE CATEGORY
// ============================================

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);

  return response.data;
};

// ============================================
// UPDATE CATEGORY
// ============================================

export const updateCategory = async (id, categoryData) => {
  const response = await api.patch(`/categories/${id}`, categoryData);

  return response.data;
};

// ============================================
// DELETE CATEGORY
// ============================================

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};
