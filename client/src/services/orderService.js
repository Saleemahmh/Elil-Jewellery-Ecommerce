import api from "./axios";

// ============================================
// CREATE ORDER
// ============================================

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};

// ============================================
// GET MY ORDERS
// ============================================

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");

  return response.data;
};

// ============================================
// GET SINGLE ORDER
// ============================================

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);

  return response.data;
};

// ============================================
// CANCEL ORDER
// ============================================

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/cancel`);

  return response.data;
};

// ============================================
// ADMIN - GET ALL ORDERS
// ============================================

export const getAllOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

// ============================================
// ADMIN - UPDATE ORDER STATUS
// ============================================

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}/status`, {
    status,
  });

  return response.data;
};
// ============================================
// ADMIN - GET SINGLE ORDER
// ============================================

export const getAdminOrderById = async (orderId) => {
  const response = await api.get(`/orders/admin/${orderId}`);

  return response.data;
};
