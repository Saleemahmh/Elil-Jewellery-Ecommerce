import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProducts, getProductBySlug } from "../../services/productService";

// ======================================================
// FETCH PRODUCTS
// ======================================================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (params = {}, thunkAPI) => {
    // `append` is a UI-only flag for "Load More" — strip it before
    // it goes out as a query param, but keep it around to tell the
    // reducer whether to replace or append the results.
    const { append = false, ...queryParams } = params;

    try {
      const data = await getProducts(queryParams);
      return { ...data, append };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);
// ============================================
// FETCH PRODUCT BY SLUG
// ============================================

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",

  async (slug, thunkAPI) => {
    try {
      return await getProductBySlug(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  products: [],

  //Product details
  selectedProduct: null,
  productLoading: false,
  productError: null,

  totalProducts: 0,

  totalPages: 1,

  currentPage: 1,

  loading: false,

  loadingMore: false,

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

      .addCase(fetchProducts.pending, (state, action) => {
        // A "Load More" request shows its own loading state
        // (loadingMore) instead of the full-page spinner, so the
        // 10 products already on screen don't disappear while the
        // next page loads.
        if (action.meta.arg?.append) {
          state.loadingMore = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })

      // ------------------------------------------------
      // FETCH SUCCESS
      // ------------------------------------------------

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;

        const newProducts = action.payload.products || [];

        state.products = action.payload.append
          ? [...state.products, ...newProducts]
          : newProducts;

        state.totalProducts = action.payload.totalProducts || 0;

        state.totalPages = action.payload.totalPages || 1;

        state.currentPage = action.payload.currentPage || 1;
      })

      // ------------------------------------------------
      // FETCH FAILED
      // ------------------------------------------------

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;

        state.error = action.payload || "Failed to fetch products";
      })
      // ------------------------------------------------
      // FETCH PRODUCT BY SLUG - PENDING
      // ------------------------------------------------

      .addCase(fetchProductBySlug.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productError = null;

        state.selectedProduct = action.payload.product || null;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.productLoading = false;

        state.productError = action.payload || "Failed to fetch product";

        state.selectedProduct = null;
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
