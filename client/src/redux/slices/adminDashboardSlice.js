import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getRecentOrders,
  getMonthlySales,
} from "../../services/adminDashboardService.js";

// ======================================================
// FETCH DASHBOARD STATS
// ======================================================

export const fetchDashboardStats = createAsyncThunk(
  "adminDashboard/fetchDashboardStats",

  async (_, thunkAPI) => {
    try {
      return await getDashboardStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard statistics",
      );
    }
  },
);

// ======================================================
// FETCH RECENT ORDERS
// ======================================================

export const fetchRecentOrders = createAsyncThunk(
  "adminDashboard/fetchRecentOrders",

  async (_, thunkAPI) => {
    try {
      return await getRecentOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent orders",
      );
    }
  },
);

// ======================================================
// FETCH MONTHLY SALES
// ======================================================

export const fetchMonthlySales = createAsyncThunk(
  "adminDashboard/fetchMonthlySales",

  async (_, thunkAPI) => {
    try {
      return await getMonthlySales();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch monthly sales",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  stats: {
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  },

  recentOrders: [],

  monthlySales: [],

  loading: false,
  recentOrdersLoading: false,
  monthlySalesLoading: false,

  error: null,
  recentOrdersError: null,
  monthlySalesError: null,
};

// ======================================================
// SLICE
// ======================================================

const adminDashboardSlice = createSlice({
  name: "adminDashboard",

  initialState,

  reducers: {
    clearDashboardErrors: (state) => {
      state.error = null;
      state.recentOrdersError = null;
      state.monthlySalesError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // DASHBOARD STATS
      // ==================================================

      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats || state.stats;
      })

      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch dashboard statistics";
      })

      // ==================================================
      // RECENT ORDERS
      // ==================================================

      .addCase(fetchRecentOrders.pending, (state) => {
        state.recentOrdersLoading = true;
        state.recentOrdersError = null;
      })

      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.recentOrdersLoading = false;

        state.recentOrders = action.payload.orders || [];
      })

      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.recentOrdersLoading = false;

        state.recentOrdersError =
          action.payload || "Failed to fetch recent orders";
      })

      // ==================================================
      // MONTHLY SALES
      // ==================================================

      .addCase(fetchMonthlySales.pending, (state) => {
        state.monthlySalesLoading = true;
        state.monthlySalesError = null;
      })

      .addCase(fetchMonthlySales.fulfilled, (state, action) => {
        state.monthlySalesLoading = false;

        state.monthlySales = action.payload.sales || [];
      })

      .addCase(fetchMonthlySales.rejected, (state, action) => {
        state.monthlySalesLoading = false;

        state.monthlySalesError =
          action.payload || "Failed to fetch monthly sales";
      });
  },
});

export const { clearDashboardErrors } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
