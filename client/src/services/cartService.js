import api from "./axios";

// =====================================
// GET CART
// =====================================

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

// =====================================
// ADD TO CART
// =====================================

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

// =====================================
// UPDATE CART ITEM
// =====================================

export const updateCartItem = async (productId, quantity) => {
  const response = await api.patch(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

// =====================================
// REMOVE CART ITEM
// =====================================

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);

  return response.data;
};

// =====================================
// CLEAR CART
// =====================================

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};
