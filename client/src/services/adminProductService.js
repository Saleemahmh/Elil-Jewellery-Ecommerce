import api from "./axios";

// ============================================
// GET ALL PRODUCTS - ADMIN
// ============================================

export const getAdminProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

// ============================================
// GET SINGLE PRODUCT - ADMIN
// ============================================

export const getAdminProductById = async (id) => {
  const response = await api.get(`/products/admin/${id}`);

  return response.data;
};

// ============================================
// CREATE PRODUCT
// ============================================

export const createAdminProduct = async (productData) => {
  const response = await api.post("/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ============================================
// UPDATE PRODUCT
// ============================================

// ============================================
// UPDATE PRODUCT
// ============================================

export const updateAdminProduct = async (id, productData) => {
  const response = await api.patch(`/products/${id}`, productData);

  return response.data;
};

// ============================================
// DELETE PRODUCT
// ============================================

export const deleteAdminProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
