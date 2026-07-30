import {
  createOrder as createOrderService,
  getMyOrders as getMyOrdersService,
  getOrderById as getOrderByIdService,
  cancelOrder as cancelOrderService,
  getAllOrders as getAllOrdersService,
  updateOrderStatus as updateOrderStatusService,
} from "../services/order.service.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const order = await createOrderService(
      req.user.id,
      shippingAddress,
      paymentMethod,
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await getMyOrdersService(req.user.id);

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

// Get Single Order
export const getOrder = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await cancelOrderService(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();

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

// Admin - Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatusService(req.params.id, status);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
