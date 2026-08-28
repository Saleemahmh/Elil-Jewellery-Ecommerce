import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminCustomers,
  getAdminCustomerById,
} from "../../services/adminCustomerService.js";

// ======================================================
// FETCH ALL CUSTOMERS
// ======================================================

export const fetchAdminCustomers = createAsyncThunk(
  "adminCustomers/fetchAdminCustomers",

  async (params = {}, thunkAPI) => {
    try {
      return await getAdminCustomers(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch customers",
      );
    }
  },
);

// ======================================================
// FETCH SINGLE CUSTOMER
// ======================================================

export const fetchAdminCustomerById = createAsyncThunk(
  "adminCustomers/fetchAdminCustomerById",

  async (id, thunkAPI) => {
    try {
      return await getAdminCustomerById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch customer",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  customers: [],
  selectedCustomer: null,

  loading: false,
  selectedCustomerLoading: false,

  error: null,
  selectedCustomerError: null,
};

// ======================================================
// SLICE
// ======================================================

const adminCustomerSlice = createSlice({
  name: "adminCustomers",

  initialState,

  reducers: {
    clearCustomerErrors: (state) => {
      state.error = null;
      state.selectedCustomerError = null;
    },

    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==============================================
      // FETCH CUSTOMERS
      // ==============================================

      .addCase(fetchAdminCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCustomers.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = action.payload.customers || [];
      })

      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch customers";
      })

      // ==============================================
      // FETCH SINGLE CUSTOMER
      // ==============================================

      .addCase(fetchAdminCustomerById.pending, (state) => {
        state.selectedCustomerLoading = true;

        state.selectedCustomerError = null;
      })

      .addCase(fetchAdminCustomerById.fulfilled, (state, action) => {
        state.selectedCustomerLoading = false;

        state.selectedCustomer = {
          ...(action.payload.customer || {}),

          // ORDER STATISTICS
          orderCount: action.payload.statistics?.totalOrders || 0,
          totalSpent: action.payload.statistics?.totalSpent || 0,

          deliveredOrders: action.payload.statistics?.deliveredOrders || 0,

          pendingOrders: action.payload.statistics?.pendingOrders || 0,

          cancelledOrders: action.payload.statistics?.cancelledOrders || 0,

          // ORDER HISTORY
          orders: action.payload.orders || [],
        };
      });
  },
});

export const { clearCustomerErrors, clearSelectedCustomer } =
  adminCustomerSlice.actions;

export default adminCustomerSlice.reducer;
