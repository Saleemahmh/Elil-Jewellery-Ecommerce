import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories } from "../../services/categoryService";

// ======================================================
// FETCH CATEGORIES
// ======================================================

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",

  async (params = {}, thunkAPI) => {
    try {
      return await getCategories(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// ======================================================
// CATEGORY SLICE
// ======================================================

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // -----------------------------------------------
      // PENDING
      // -----------------------------------------------

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        // Adjust this depending on your backend response.
        state.categories =
          action.payload.categories || action.payload.data || [];
      })

      // -----------------------------------------------
      // FAILED
      // -----------------------------------------------

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export default categorySlice.reducer;
