import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getRecentOrders,
  getMonthlySales,
} from "../../services/adminDashboardService";

// ==========================================
// FETCH STATS
// ==========================================

export const fetchDashboardStats = createAsyncThunk(
  "adminDashboard/fetchStats",
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

// ==========================================
// FETCH RECENT ORDERS
// ==========================================

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

// ==========================================
// FETCH MONTHLY SALES
// ==========================================

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

// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {
  stats: null,
  recentOrders: [],
  monthlySales: [],

  loadingStats: false,
  loadingOrders: false,
  loadingSales: false,

  statsError: null,
  ordersError: null,
  salesError: null,
};

// ==========================================
// SLICE
// ==========================================

const adminDashboardSlice = createSlice({
  name: "adminDashboard",

  initialState,

  reducers: {
    clearDashboardErrors: (state) => {
      state.statsError = null;
      state.ordersError = null;
      state.salesError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // STATS
      // ======================================

      .addCase(fetchDashboardStats.pending, (state) => {
        state.loadingStats = true;
        state.statsError = null;
      })

      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.statsError = null;

        state.stats = action.payload.stats || null;
      })

      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loadingStats = false;

        state.statsError =
          action.payload || "Failed to fetch dashboard statistics";
      })

      // ======================================
      // RECENT ORDERS
      // ======================================

      .addCase(fetchRecentOrders.pending, (state) => {
        state.loadingOrders = true;
        state.ordersError = null;
      })

      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.ordersError = null;

        state.recentOrders = action.payload.orders || [];
      })

      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.loadingOrders = false;

        state.ordersError = action.payload || "Failed to fetch recent orders";
      })

      // ======================================
      // MONTHLY SALES
      // ======================================

      .addCase(fetchMonthlySales.pending, (state) => {
        state.loadingSales = true;
        state.salesError = null;
      })

      .addCase(fetchMonthlySales.fulfilled, (state, action) => {
        state.loadingSales = false;
        state.salesError = null;

        state.monthlySales = action.payload.sales || [];
      })

      .addCase(fetchMonthlySales.rejected, (state, action) => {
        state.loadingSales = false;

        state.salesError = action.payload || "Failed to fetch monthly sales";
      });
  },
});

export const { clearDashboardErrors } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
