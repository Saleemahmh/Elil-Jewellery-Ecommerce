import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductBySlug,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../../services/productService";

// ======================================================
// FETCH PRODUCTS
// ======================================================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (params = {}, thunkAPI) => {
    const { append = false, ...queryParams } = params;

    try {
      const data = await getProducts(queryParams, thunkAPI.signal);
      return { ...data, append };
    } catch (error) {
      // Ignore cancelled requests
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        return thunkAPI.rejectWithValue("Request cancelled");
      }

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
// CREATE PRODUCT - ADMIN
// ======================================================

export const createProduct = createAsyncThunk(
  "products/createProduct",

  async (formData, thunkAPI) => {
    try {
      const data = await createProductService(formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);

// ======================================================
// UPDATE PRODUCT - ADMIN
// ======================================================

export const updateProduct = createAsyncThunk(
  "products/updateProduct",

  async ({ productId, formData }, thunkAPI) => {
    try {
      const data = await updateProductService(productId, formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

// ======================================================
// DELETE PRODUCT - ADMIN
// ======================================================

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",

  async (productId, thunkAPI) => {
    try {
      const data = await deleteProductService(productId);

      return {
        ...data,
        productId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
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
  activeRequestId: null,

  error: null,

  // Shop filters
  filters: {
    search: "",
    category: "",
    collection: "",
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
    clearProducts: (state) => {
      state.products = [];
      state.totalProducts = 0;
      state.totalPages = 1;
      state.currentPage = 1;
      state.error = null;
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
        state.activeRequestId = action.meta.requestId;

        if (action.meta.arg?.append) {
          state.loadingMore = true;
        } else {
          state.loading = true;
          state.products = [];
        }

        state.error = null;
      })
      // ------------------------------------------------
      // FETCH SUCCESS
      // ------------------------------------------------

      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Ignore an old request that finished after a newer request
        if (state.activeRequestId !== action.meta.requestId) {
          return;
        }

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
        // Ignore an old request that finished after a newer request
        if (state.activeRequestId !== action.meta.requestId) {
          return;
        }

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
      })
      // ==================================================
      // CREATE PRODUCT
      // ==================================================

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload.product) {
          state.products.unshift(action.payload.product);
        }
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create product";
      })

      // ==================================================
      // UPDATE PRODUCT
      // ==================================================

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedProduct = action.payload.product;

        if (updatedProduct) {
          state.products = state.products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product,
          );

          state.selectedProduct = updatedProduct;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to update product";
      })

      // ==================================================
      // DELETE PRODUCT
      // ==================================================

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId,
        );

        if (state.selectedProduct?._id === action.payload.productId) {
          state.selectedProduct = null;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to delete product";
      });
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================

export const { setFilters, clearFilters, setPage, clearProducts } =
  productSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default productSlice.reducer;
