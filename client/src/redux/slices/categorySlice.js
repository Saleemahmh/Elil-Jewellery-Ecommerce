import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCategories,
  getCategoryById,
  getAdminCategories,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../../services/categoryService";

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
// FETCH ALL CATEGORIES - ADMIN
// ======================================================

export const fetchAdminCategories = createAsyncThunk(
  "categories/fetchAdminCategories",

  async (_, thunkAPI) => {
    try {
      return await getAdminCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin categories",
      );
    }
  },
);
// ======================================================
// FETCH SINGLE CATEGORY
// ======================================================

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",

  async (id, thunkAPI) => {
    try {
      return await getCategoryById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);

// ======================================================
// CREATE CATEGORY
// ======================================================

export const createCategory = createAsyncThunk(
  "categories/createCategory",

  async (categoryData, thunkAPI) => {
    try {
      return await createCategoryService(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create category",
      );
    }
  },
);

// ======================================================
// UPDATE CATEGORY
// ======================================================

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",

  async ({ id, categoryData }, thunkAPI) => {
    try {
      return await updateCategoryService(id, categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);

// ======================================================
// DELETE CATEGORY
// ======================================================

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",

  async (id, thunkAPI) => {
    try {
      return await deleteCategoryService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  categories: [],
  selectedCategory: null,

  loading: false,
  selectedCategoryLoading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
  selectedCategoryError: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

// ======================================================
// CATEGORY SLICE
// ======================================================

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    clearCategoryErrors: (state) => {
      state.error = null;
      state.selectedCategoryError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH CATEGORIES
      // ==================================================

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        //state.categories =
        //action.payload.categories || action.payload.data || [];
        state.categories = action.payload.categories || [];
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch categories";
      })

      // ==================================================
      // FETCH SINGLE CATEGORY
      // ==================================================

      .addCase(fetchCategoryById.pending, (state) => {
        state.selectedCategoryLoading = true;
        state.selectedCategoryError = null;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategoryLoading = false;

        state.selectedCategory = action.payload.category || null;
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.selectedCategoryLoading = false;

        state.selectedCategoryError =
          action.payload || "Failed to fetch category";
      })

      // ==================================================
      // CREATE CATEGORY
      // ==================================================

      .addCase(createCategory.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.creating = false;

        const category = action.payload.category;

        if (category) {
          state.categories.unshift(category);
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.creating = false;

        state.createError = action.payload || "Failed to create category";
      })

      // ==================================================
      // UPDATE CATEGORY
      // ==================================================

      .addCase(updateCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updating = false;

        const updatedCategory = action.payload.category;

        if (updatedCategory) {
          state.categories = state.categories.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category,
          );

          state.selectedCategory = updatedCategory;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.updating = false;

        state.updateError = action.payload || "Failed to update category";
      })

      // ==================================================
      // DELETE CATEGORY
      // ==================================================

      .addCase(deleteCategory.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleting = false;

        const deletedId = action.meta.arg;

        state.categories = state.categories.filter(
          (category) => category._id !== deletedId,
        );

        if (state.selectedCategory?._id === deletedId) {
          state.selectedCategory = null;
        }
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleting = false;

        state.deleteError = action.payload || "Failed to delete category";
      })
      .addCase(fetchAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload.categories || [];
      })

      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch categories";
      });
  },
});

export const { clearCategoryErrors, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
