import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";

// ======================================================
// DASHBOARD STATISTICS
// ======================================================

export const getDashboardStats = async () => {
  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    pendingOrders,
    lowStockProducts,
    revenueResult,
  ] = await Promise.all([
    // Total Products
    Product.countDocuments(),

    // Total Customers
    User.countDocuments({
      role: "customer",
    }),

    // Total Orders
    Order.countDocuments(),

    // Pending Orders
    Order.countDocuments({
      orderStatus: "Pending",
    }),

    // Low Stock Products
    Product.countDocuments({
      stock: { $lt: 5 },
    }),

    // Revenue
    Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
  ]);

  const totalRevenue =
    revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  return {
    totalProducts,
    totalCustomers,
    totalOrders,
    totalRevenue,
    pendingOrders,
    lowStockProducts,
  };
};

// ======================================================
// RECENT ORDERS
// ======================================================

export const getRecentOrders = async () => {
  return await Order.find()
    .populate("user", "fullName email")
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .lean();
};

// ======================================================
// MONTHLY SALES ANALYTICS
// ======================================================

export const getMonthlySales = async () => {
  const sales = await Order.aggregate([
    {
      $match: {
        orderStatus: {
          $ne: "Cancelled",
        },
      },
    },

    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },

        revenue: {
          $sum: "$totalAmount",
        },

        orders: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return sales.map((item) => ({
    year: item._id.year,
    month: monthNames[item._id.month - 1],
    revenue: item.revenue,
    orders: item.orders,
  }));
};
