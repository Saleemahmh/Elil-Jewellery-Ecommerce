import User from "../models/user.js";
import Order from "../models/order.js";

// ======================================================
// ADMIN - GET ALL CUSTOMERS
// ======================================================

export const getAllCustomers = async ({ search = "" } = {}) => {
  const userQuery = {
    role: "customer",
  };

  // Search by name, email, or phone
  if (search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    userQuery.$or = [
      { fullName: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
    ];
  }

  const customers = await User.find(userQuery)
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  if (customers.length === 0) {
    return [];
  }

  const customerIds = customers.map((customer) => customer._id);

  // ====================================================
  // GET ORDER STATISTICS
  // ====================================================

  const orderStats = await Order.aggregate([
    {
      $match: {
        user: {
          $in: customerIds,
        },
      },
    },

    {
      $group: {
        _id: "$user",

        orderCount: {
          $sum: 1,
        },

        totalSpent: {
          $sum: {
            $cond: [
              {
                $ne: ["$orderStatus", "Cancelled"],
              },
              "$totalAmount",
              0,
            ],
          },
        },
      },
    },
  ]);

  // ====================================================
  // CREATE LOOKUP MAP
  // ====================================================

  const statsMap = new Map(
    orderStats.map((stat) => [
      stat._id.toString(),
      {
        orderCount: stat.orderCount,
        totalSpent: stat.totalSpent,
      },
    ]),
  );

  // ====================================================
  // COMBINE CUSTOMER + ORDER DATA
  // ====================================================

  return customers.map((customer) => {
    const stats = statsMap.get(customer._id.toString());

    return {
      ...customer,

      orderCount: stats?.orderCount || 0,

      totalSpent: stats?.totalSpent || 0,
    };
  });
};

// ======================================================
// ADMIN - GET CUSTOMER BY ID
// ======================================================

export const getCustomerById = async (customerId) => {
  const customer = await User.findOne({
    _id: customerId,
    role: "customer",
  })
    .select("-password")
    .lean();

  if (!customer) {
    throw new Error("Customer not found");
  }

  // ====================================================
  // GET CUSTOMER ORDERS
  // ====================================================

  const orders = await Order.find({
    user: customerId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  // ====================================================
  // ORDER STATISTICS
  // ====================================================

  const totalOrders = orders.length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "Cancelled",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;

  const pendingOrders = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.orderStatus),
  ).length;

  const totalSpent = orders.reduce((total, order) => {
    if (order.orderStatus === "Cancelled") {
      return total;
    }

    return total + order.totalAmount;
  }, 0);

  return {
    customer,

    statistics: {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      cancelledOrders,
      totalSpent,
    },

    orders,
  };
};
