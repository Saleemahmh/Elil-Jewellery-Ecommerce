import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartItem as updateCartItemService,
  removeCartItem as removeCartItemService,
  clearCart as clearCartService,
} from "../../services/cartService";

// =====================================
// GET CART
// =====================================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (_, thunkAPI) => {
    try {
      return await getCartService();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load cart",
      );
    }
  },
);

// =====================================
// ADD TO CART
// =====================================

export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await addToCartService(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart",
      );
    }
  },
);

// =====================================
// UPDATE CART ITEM
// =====================================

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",

  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await updateCartItemService(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart",
      );
    }
  },
);

// =====================================
// REMOVE CART ITEM
// =====================================

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",

  async (productId, thunkAPI) => {
    try {
      return await removeCartItemService(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

// =====================================
// CLEAR CART
// =====================================

export const clearCart = createAsyncThunk(
  "cart/clearCart",

  async (_, thunkAPI) => {
    try {
      return await clearCartService();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

// =====================================
// INITIAL STATE
// =====================================

const initialState = {
  cart: null,

  items: [],

  totalItems: 0,

  loading: false,

  adding: false,

  updating: false,

  removing: false,

  clearing: false,

  error: null,
};

// =====================================
// HELPER
// =====================================

const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// =====================================
// SLICE
// =====================================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },

    resetCart: (state) => {
      state.cart = null;
      state.items = [];
      state.totalItems = 0;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================
      // GET CART
      // =================================

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload.cart || null;

        state.items = action.payload.cart?.items || [];

        state.totalItems = calculateTotalItems(state.items);

        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to load cart";
      })

      // =================================
      // ADD TO CART
      // =================================

      .addCase(addToCart.pending, (state) => {
        state.adding = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.adding = false;

        state.cart = action.payload.cart || null;

        state.items = action.payload.cart?.items || [];

        state.totalItems = calculateTotalItems(state.items);

        state.error = null;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.adding = false;

        state.error = action.payload || "Failed to add product to cart";
      })

      // =================================
      // UPDATE CART ITEM
      // =================================

      .addCase(updateCartItem.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.updating = false;

        state.cart = action.payload.cart || null;

        state.items = action.payload.cart?.items || [];

        state.totalItems = calculateTotalItems(state.items);

        state.error = null;
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.updating = false;

        state.error = action.payload || "Failed to update cart";
      })

      // =================================
      // REMOVE CART ITEM
      // =================================

      .addCase(removeCartItem.pending, (state) => {
        state.removing = true;
        state.error = null;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.removing = false;

        state.cart = action.payload.cart || null;

        state.items = action.payload.cart?.items || [];

        state.totalItems = calculateTotalItems(state.items);

        state.error = null;
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.removing = false;

        state.error = action.payload || "Failed to remove product";
      })

      // =================================
      // CLEAR CART
      // =================================

      .addCase(clearCart.pending, (state) => {
        state.clearing = true;
        state.error = null;
      })

      .addCase(clearCart.fulfilled, (state, action) => {
        state.clearing = false;

        state.cart = action.payload.cart || null;

        state.items = action.payload.cart?.items || [];

        state.totalItems = 0;

        state.error = null;
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.clearing = false;

        state.error = action.payload || "Failed to clear cart";
      });
  },
});

// =====================================
// EXPORT ACTIONS
// =====================================

export const { clearCartError, resetCart } = cartSlice.actions;

// =====================================
// EXPORT REDUCER
// =====================================

export default cartSlice.reducer;
