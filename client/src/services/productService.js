import api from "./axios";

// ======================================================
// GET ALL PRODUCTS
// ======================================================

export const getProducts = async (params = {}, signal) => {
  const response = await api.get("/products", {
    params,
    signal,
  });

  return response.data;
};

// ======================================================
// GET PRODUCT BY SLUG
// ======================================================

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);

  return response.data;
};

// ======================================================
// CREATE PRODUCT - ADMIN
// ======================================================

export const createProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
// ============================================
// ADMIN — GET PRODUCT BY ID
// ============================================

export const getAdminProductById = async (id) => {
  const response = await api.get(`/products/admin/${id}`);

  return response.data;
};
// ======================================================
// UPDATE PRODUCT - ADMIN
// ======================================================

export const updateProduct = async (productId, formData) => {
  const response = await api.patch(`/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ======================================================
// DELETE PRODUCT - ADMIN
// ======================================================

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);

  return response.data;
};
