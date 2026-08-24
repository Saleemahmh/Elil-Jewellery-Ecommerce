import api from "./axios";

// ==========================================
// DASHBOARD STATS
// ==========================================

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};

// ==========================================
// RECENT ORDERS
// ==========================================

export const getRecentOrders = async () => {
  const response = await api.get("/dashboard/recent-orders");

  return response.data;
};

// ==========================================
// MONTHLY SALES
// ==========================================

export const getMonthlySales = async () => {
  const response = await api.get("/dashboard/monthly-sales");

  return response.data;
};
