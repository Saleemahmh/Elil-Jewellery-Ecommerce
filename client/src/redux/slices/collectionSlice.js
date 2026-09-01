import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCollections,
  getCollectionBySlug,
  getCollectionProducts,
} from "../../services/collectionService";
// ======================================================
// FETCH COLLECTIONS
// ======================================================

export const fetchCollections = createAsyncThunk(
  "collections/fetchCollections",

  async (_, thunkAPI) => {
    try {
      return await getCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collections",
      );
    }
  },
);

// ======================================================
// FETCH COLLECTION BY SLUG
// ======================================================

export const fetchCollectionBySlug = createAsyncThunk(
  "collections/fetchCollectionBySlug",

  async (slug, thunkAPI) => {
    try {
      return await getCollectionBySlug(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection",
      );
    }
  },
);
// ======================================================
// FETCH PRODUCTS FOR ALL COLLECTIONS
// ======================================================

export const fetchCollectionProducts = createAsyncThunk(
  "collections/fetchCollectionProducts",

  async (collections, thunkAPI) => {
    try {
      const results = await Promise.all(
        collections.map(async (collection) => {
          const data = await getCollectionProducts(collection._id);

          return {
            collectionId: collection._id,
            products: data.products || [],
          };
        }),
      );

      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection products",
      );
    }
  },
);
// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  collections: [],
  selectedCollection: null,

  productsByCollection: {},

  loading: false,
  selectedCollectionLoading: false,
  collectionProductsLoading: false,

  error: null,
  selectedCollectionError: null,
  collectionProductsError: null,
};

// ======================================================
// COLLECTION SLICE
// ======================================================

const collectionSlice = createSlice({
  name: "collections",

  initialState,

  reducers: {
    clearCollectionErrors: (state) => {
      state.error = null;
      state.selectedCollectionError = null;
    },

    clearSelectedCollection: (state) => {
      state.selectedCollection = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH COLLECTIONS
      // ==================================================

      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;

        state.collections = action.payload.collections || [];
      })

      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch collections";
      })

      // ==================================================
      // FETCH COLLECTION BY SLUG
      // ==================================================

      .addCase(fetchCollectionBySlug.pending, (state) => {
        state.selectedCollectionLoading = true;
        state.selectedCollectionError = null;
        state.selectedCollection = null;
      })

      .addCase(fetchCollectionBySlug.fulfilled, (state, action) => {
        state.selectedCollectionLoading = false;

        state.selectedCollection = action.payload.collection || null;
      })

      .addCase(fetchCollectionBySlug.rejected, (state, action) => {
        state.selectedCollectionLoading = false;

        state.selectedCollectionError =
          action.payload || "Failed to fetch collection";
      })
      // ==================================================
      // FETCH COLLECTION PRODUCTS
      // ==================================================

      .addCase(fetchCollectionProducts.pending, (state) => {
        state.collectionProductsLoading = true;
        state.collectionProductsError = null;
      })

      .addCase(fetchCollectionProducts.fulfilled, (state, action) => {
        state.collectionProductsLoading = false;
        state.collectionProductsError = null;

        state.productsByCollection = {};

        action.payload.forEach(({ collectionId, products }) => {
          state.productsByCollection[collectionId] = products;
        });
      })

      .addCase(fetchCollectionProducts.rejected, (state, action) => {
        state.collectionProductsLoading = false;

        state.collectionProductsError =
          action.payload || "Failed to fetch collection products";
      });
  },
});

export const { clearCollectionErrors, clearSelectedCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
