import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAllOrders as getAllOrdersService,
  updateOrderStatus as updateOrderStatusService,
} from "../../services/orderService";

// ======================================================
// GET ALL ORDERS - ADMIN
// ======================================================

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",

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
// UPDATE ORDER STATUS - ADMIN
// ======================================================

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",

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

  loading: false,
  error: null,

  updatingStatus: false,
  updateError: null,
};

// ======================================================
// SLICE
// ======================================================

const adminOrderSlice = createSlice({
  name: "adminOrders",

  initialState,

  reducers: {
    clearAdminOrderError: (state) => {
      state.error = null;
      state.updateError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH ALL ORDERS
      // ==================================================

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.orders = action.payload.orders || [];
      })

      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch orders";
      })

      // ==================================================
      // UPDATE STATUS
      // ==================================================

      .addCase(updateOrderStatus.pending, (state) => {
        state.updatingStatus = true;
        state.updateError = null;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updatingStatus = false;
        state.updateError = null;

        const updatedOrder = action.payload.order;

        if (updatedOrder) {
          state.orders = state.orders.map((order) =>
            order._id === updatedOrder._id
              ? {
                  ...order,
                  ...updatedOrder,
                }
              : order,
          );
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updatingStatus = false;

        state.updateError = action.payload || "Failed to update order status";
      });
  },
});

export const { clearAdminOrderError } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
