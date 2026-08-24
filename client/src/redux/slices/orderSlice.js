import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createOrder as createOrderService,
  getMyOrders as getMyOrdersService,
  getOrderById as getOrderByIdService,
  cancelOrder as cancelOrderService,
  getAllOrders as getAllOrdersService,
  getAdminOrderById as getAdminOrderByIdService,
  updateOrderStatus as updateOrderStatusService,
} from "../../services/orderService";

// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = createAsyncThunk(
  "orders/createOrder",

  async (orderData, thunkAPI) => {
    try {
      const data = await createOrderService(orderData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order",
      );
    }
  },
);

// ======================================================
// GET MY ORDERS
// ======================================================

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",

  async (_, thunkAPI) => {
    try {
      const data = await getMyOrdersService();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// ======================================================
// GET SINGLE ORDER
// ======================================================

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",

  async (orderId, thunkAPI) => {
    try {
      const data = await getOrderByIdService(orderId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

// ======================================================
// CANCEL ORDER
// ======================================================

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",

  async (orderId, thunkAPI) => {
    try {
      const data = await cancelOrderService(orderId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);
// ======================================================
// ADMIN - GET ALL ORDERS
// ======================================================

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",

  async (_, thunkAPI) => {
    try {
      const data = await getAllOrdersService();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);
// ======================================================
// ADMIN - GET SINGLE ORDER
// ======================================================

export const fetchAdminOrderById = createAsyncThunk(
  "orders/fetchAdminOrderById",

  async (orderId, thunkAPI) => {
    try {
      const data = await getAdminOrderByIdService(orderId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);
// ======================================================
// ADMIN - UPDATE ORDER STATUS
// ======================================================

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",

  async ({ orderId, status }, thunkAPI) => {
    try {
      const data = await updateOrderStatusService(orderId, status);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  },
);
// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  orders: [],

  selectedOrder: null,

  loading: false,

  error: null,

  placingOrder: false,

  orderError: null,

  cancelling: false,

  cancelError: null,

  // Admin
  adminLoading: false,
  adminError: null,

  updatingStatus: false,
  statusError: null,
};

// ======================================================
// ORDER SLICE
// ======================================================

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    clearOrderError: (state) => {
      state.orderError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ============================================
      // CREATE ORDER
      // ============================================

      .addCase(createOrder.pending, (state) => {
        state.placingOrder = true;
        state.orderError = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.orderError = null;

        state.selectedOrder = action.payload.order || null;

        if (action.payload.order) {
          state.orders.unshift(action.payload.order);
        }
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.placingOrder = false;

        state.orderError = action.payload || "Failed to place order";
      })

      // ============================================
      // FETCH MY ORDERS
      // ============================================

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.orders = action.payload.orders || [];
      })

      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch orders";
      })

      // ============================================
      // FETCH SINGLE ORDER
      // ============================================

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.selectedOrder = action.payload.order || null;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch order";

        state.selectedOrder = null;
      })

      // ============================================
      // CANCEL ORDER
      // ============================================

      .addCase(cancelOrder.pending, (state) => {
        state.cancelling = true;
        state.cancelError = null;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelling = false;
        state.cancelError = null;

        const cancelledOrder = action.payload.order;

        if (cancelledOrder) {
          state.selectedOrder = cancelledOrder;

          state.orders = state.orders.map((order) =>
            order._id === cancelledOrder._id ? cancelledOrder : order,
          );
        }
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelling = false;

        state.cancelError = action.payload || "Failed to cancel order";
      })
      // ============================================
      // ADMIN - FETCH SINGLE ORDER
      // ============================================

      .addCase(fetchAdminOrderById.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
        state.selectedOrder = null;
      })

      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminError = null;

        state.selectedOrder = action.payload.order || null;
      })

      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.adminLoading = false;

        state.adminError = action.payload || "Failed to fetch order";

        state.selectedOrder = null;
      })

      // ============================================
      // ADMIN - UPDATE ORDER STATUS
      // ============================================

      .addCase(changeOrderStatus.pending, (state) => {
        state.updatingStatus = true;
        state.statusError = null;
      })

      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.updatingStatus = false;
        state.statusError = null;

        const updatedOrder = action.payload.order;

        if (updatedOrder) {
          state.selectedOrder = updatedOrder;

          state.orders = state.orders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order,
          );
        }
      })

      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.updatingStatus = false;

        state.statusError = action.payload || "Failed to update order status";
      });
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const { clearSelectedOrder, clearOrderError } = orderSlice.actions;

// ======================================================
// REDUCER
// ======================================================

export default orderSlice.reducer;
