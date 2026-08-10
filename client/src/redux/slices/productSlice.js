import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../../services/productService";

// ======================================================
// FETCH PRODUCTS
// ======================================================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (params = {}, thunkAPI) => {
    try {
      return await getProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  products: [],

  totalProducts: 0,

  totalPages: 1,

  currentPage: 1,

  loading: false,

  error: null,

  // Shop filters
  filters: {
    search: "",
    category: "",
    featured: "",
    bestSeller: "",
    newArrival: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  },
};

// ======================================================
// PRODUCT SLICE
// ======================================================

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    // --------------------------------------------------
    // Set / update filters
    // --------------------------------------------------

    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      // Whenever a filter changes,
      // return to page 1.
      state.currentPage = 1;
    },

    // --------------------------------------------------
    // Clear all filters
    // --------------------------------------------------

    clearFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        featured: "",
        bestSeller: "",
        newArrival: "",
        minPrice: "",
        maxPrice: "",
        sort: "newest",
      };

      state.currentPage = 1;
    },

    // --------------------------------------------------
    // Change page
    // --------------------------------------------------

    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  // ====================================================
  // ASYNC ACTIONS
  // ====================================================

  extraReducers: (builder) => {
    builder

      // ------------------------------------------------
      // FETCH PENDING
      // ------------------------------------------------

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ------------------------------------------------
      // FETCH SUCCESS
      // ------------------------------------------------

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products || [];

        state.totalProducts = action.payload.totalProducts || 0;

        state.totalPages = action.payload.totalPages || 1;

        state.currentPage = action.payload.currentPage || 1;
      })

      // ------------------------------------------------
      // FETCH FAILED
      // ------------------------------------------------

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch products";
      });
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================

export const { setFilters, clearFilters, setPage } = productSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default productSlice.reducer;
