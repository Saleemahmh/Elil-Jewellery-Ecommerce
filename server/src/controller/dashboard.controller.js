import {
  getDashboardStats as getDashboardStatsService,
  getRecentOrders as getRecentOrdersService,
  getMonthlySales as getMonthlySalesService,
} from "../services/dashboard.service.js";

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//recent orders
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await getRecentOrdersService();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Monthly analytics

export const getMonthlySales = async (req, res) => {
  try {
    const sales = await getMonthlySalesService();

    return res.status(200).json({
      success: true,
      sales,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
