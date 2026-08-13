import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWishlist as getWishlistService,
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
} from "../../services/wishlistService";

import { logout } from "./authSlice";

// =====================================
// GET WISHLIST
// =====================================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",

  async (_, thunkAPI) => {
    try {
      return await getWishlistService();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load wishlist",
      );
    }
  },
);

// =====================================
// ADD TO WISHLIST
// =====================================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",

  async (productId, thunkAPI) => {
    try {
      return await addToWishlistService(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist",
      );
    }
  },
);

// =====================================
// REMOVE FROM WISHLIST
// =====================================

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",

  async (productId, thunkAPI) => {
    try {
      return await removeFromWishlistService(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove product from wishlist",
      );
    }
  },
);

// =====================================
// INITIAL STATE
// =====================================

const initialState = {
  wishlist: null,

  products: [],

  loading: false,

  adding: false,

  removing: false,

  error: null,
};

// =====================================
// SLICE
// =====================================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },

    clearWishlist: (state) => {
      state.wishlist = null;
      state.products = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================
      // FETCH WISHLIST
      // =================================

      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.wishlist = action.payload.wishlist || null;

        state.products = action.payload.wishlist?.products || [];

        state.error = null;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to load wishlist";
      })

      // =================================
      // ADD TO WISHLIST
      // =================================

      .addCase(addToWishlist.pending, (state) => {
        state.adding = true;
        state.error = null;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.adding = false;

        state.wishlist = action.payload.wishlist || null;

        state.products = action.payload.wishlist?.products || [];

        state.error = null;
      })

      .addCase(addToWishlist.rejected, (state, action) => {
        state.adding = false;

        state.error = action.payload || "Failed to add product to wishlist";
      })

      // =================================
      // REMOVE FROM WISHLIST
      // =================================

      .addCase(removeFromWishlist.pending, (state) => {
        state.removing = true;
        state.error = null;
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.removing = false;

        state.wishlist = action.payload.wishlist || null;

        state.products = action.payload.wishlist?.products || [];

        state.error = null;
      })

      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.removing = false;

        state.error =
          action.payload || "Failed to remove product from wishlist";
      })

      // =================================
      // AUTO-CLEAR ON LOGOUT
      // =================================
      //
      // This is what's new: wishlistSlice now listens for authSlice's
      // logout.fulfilled directly. So no matter where logout gets
      // triggered from (Navbar today, anywhere else later), this
      // slice resets itself in the same tick — every component
      // reading state.wishlist.products (ProductCard, ProductActions,
      // WishlistButton) immediately sees isWishlisted go false,
      // without needing a page reload or every call site remembering
      // to also dispatch clearWishlist().

      .addCase(logout.fulfilled, (state) => {
        state.wishlist = null;
        state.products = [];
        state.error = null;
      });
  },
});

// =====================================
// EXPORT ACTIONS
// =====================================

export const { clearWishlistError, clearWishlist } = wishlistSlice.actions;

// =====================================
// EXPORT REDUCER
// =====================================

export default wishlistSlice.reducer;
