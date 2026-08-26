import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../services/adminProductService";
import { getAdminProductById } from "../../services/productService";

// ======================================================
// FETCH ALL PRODUCTS
// ======================================================

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",

  async (params = {}, thunkAPI) => {
    try {
      return await getAdminProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// ======================================================
// CREATE PRODUCT
// ======================================================

export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",

  async (productData, thunkAPI) => {
    try {
      return await createAdminProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);
// ======================================================
// GET ADMIN PRODUCT BY ID
// ======================================================

export const fetchAdminProductById = createAsyncThunk(
  "adminProducts/fetchAdminProductById",

  async (productId, thunkAPI) => {
    try {
      const data = await getAdminProductById(productId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);
// ======================================================
// UPDATE PRODUCT
// ======================================================

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",

  async ({ id, productData }, thunkAPI) => {
    try {
      return await updateAdminProduct(id, productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

// ======================================================
// DELETE PRODUCT
// ======================================================

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",

  async (id, thunkAPI) => {
    try {
      return await deleteAdminProduct(id);
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

  selectedProduct: null,

  totalProducts: 0,

  totalPages: 1,

  currentPage: 1,

  loading: false,

  creating: false,

  updating: false,

  deleting: false,

  error: null,

  createError: null,

  updateError: null,

  deleteError: null,

  selectedProductLoading: false,

  selectedProductError: null,
};

// ======================================================
// SLICE
// ======================================================

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState,

  reducers: {
    clearProductErrors: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH PRODUCTS
      // ==================================================

      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products || [];

        state.totalProducts = action.payload.totalProducts || 0;

        state.totalPages = action.payload.totalPages || 1;

        state.currentPage = action.payload.currentPage || 1;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch products";
      })

      // ==================================================
      // CREATE PRODUCT
      // ==================================================

      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;

        const product = action.payload.product;

        if (product) {
          state.products.unshift(product);
          state.totalProducts += 1;
        }
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;

        state.createError = action.payload || "Failed to create product";
      })

      // ==================================================
      // UPDATE PRODUCT
      // ==================================================

      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false;

        const updatedProduct = action.payload.product;

        if (updatedProduct) {
          state.products = state.products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product,
          );

          state.selectedProduct = updatedProduct;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = false;

        state.updateError = action.payload || "Failed to update product";
      })

      // ==================================================
      // DELETE PRODUCT
      // ==================================================

      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = false;

        // The thunk returns the deleted ID separately below.
        const deletedId = action.meta.arg;

        state.products = state.products.filter(
          (product) => product._id !== deletedId,
        );

        state.totalProducts = Math.max(0, state.totalProducts - 1);
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = false;

        state.deleteError = action.payload || "Failed to delete product";
      })
      // ====================================================
      // GET ADMIN PRODUCT BY ID
      // ====================================================

      .addCase(fetchAdminProductById.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
        state.selectedProduct = null;
      })

      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError = null;

        state.selectedProduct = action.payload.product || null;
      })

      .addCase(fetchAdminProductById.rejected, (state, action) => {
        state.selectedProductLoading = false;

        state.selectedProductError =
          action.payload || "Failed to fetch product";

        state.selectedProduct = null;
      });
  },
});

export const { clearProductErrors, clearSelectedProduct } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
