import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminCollections,
  getAdminCollectionById,
  createAdminCollection,
  updateAdminCollection,
  deleteAdminCollection,
} from "../../services/adminCollectionService";

// ======================================================
// FETCH ALL COLLECTIONS
// ======================================================

export const fetchAdminCollections = createAsyncThunk(
  "adminCollections/fetchAdminCollections",

  async (_, thunkAPI) => {
    try {
      return await getAdminCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collections",
      );
    }
  },
);

// ======================================================
// FETCH COLLECTION BY ID
// ======================================================

export const fetchAdminCollectionById = createAsyncThunk(
  "adminCollections/fetchAdminCollectionById",

  async (collectionId, thunkAPI) => {
    try {
      return await getAdminCollectionById(collectionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch collection",
      );
    }
  },
);

// ======================================================
// CREATE COLLECTION
// ======================================================

export const createCollection = createAsyncThunk(
  "adminCollections/createCollection",

  async (formData, thunkAPI) => {
    try {
      return await createAdminCollection(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create collection",
      );
    }
  },
);

// ======================================================
// UPDATE COLLECTION
// ======================================================

export const updateCollection = createAsyncThunk(
  "adminCollections/updateCollection",

  async ({ collectionId, formData }, thunkAPI) => {
    try {
      return await updateAdminCollection(collectionId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update collection",
      );
    }
  },
);

// ======================================================
// DELETE COLLECTION
// ======================================================

export const deleteCollection = createAsyncThunk(
  "adminCollections/deleteCollection",

  async (collectionId, thunkAPI) => {
    try {
      const data = await deleteAdminCollection(collectionId);

      return {
        ...data,
        collectionId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete collection",
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

  loading: false,

  creating: false,

  updating: false,

  deleting: false,

  error: null,

  actionError: null,
};

// ======================================================
// SLICE
// ======================================================

const adminCollectionSlice = createSlice({
  name: "adminCollections",

  initialState,

  reducers: {
    // --------------------------------------------------
    // CLEAR SELECTED COLLECTION
    // --------------------------------------------------

    clearSelectedCollection: (state) => {
      state.selectedCollection = null;
    },

    // --------------------------------------------------
    // CLEAR ERRORS
    // --------------------------------------------------

    clearCollectionErrors: (state) => {
      state.error = null;
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH ALL COLLECTIONS
      // ==================================================

      .addCase(fetchAdminCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.collections = action.payload.collections || [];
      })

      .addCase(fetchAdminCollections.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch collections";
      })

      // ==================================================
      // FETCH COLLECTION BY ID
      // ==================================================

      .addCase(fetchAdminCollectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCollection = null;
      })

      .addCase(fetchAdminCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.selectedCollection = action.payload.collection || null;
      })

      .addCase(fetchAdminCollectionById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch collection";
      })

      // ==================================================
      // CREATE COLLECTION
      // ==================================================

      .addCase(createCollection.pending, (state) => {
        state.creating = true;
        state.actionError = null;
      })

      .addCase(createCollection.fulfilled, (state, action) => {
        state.creating = false;
        state.actionError = null;

        if (action.payload.collection) {
          state.collections.push(action.payload.collection);

          // Keep collections ordered by displayOrder
          state.collections.sort(
            (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
          );
        }
      })

      .addCase(createCollection.rejected, (state, action) => {
        state.creating = false;

        state.actionError = action.payload || "Failed to create collection";
      })

      // ==================================================
      // UPDATE COLLECTION
      // ==================================================

      .addCase(updateCollection.pending, (state) => {
        state.updating = true;
        state.actionError = null;
      })

      .addCase(updateCollection.fulfilled, (state, action) => {
        state.updating = false;
        state.actionError = null;

        const updatedCollection = action.payload.collection;

        if (updatedCollection) {
          state.collections = state.collections.map((collection) =>
            collection._id === updatedCollection._id
              ? updatedCollection
              : collection,
          );

          state.selectedCollection = updatedCollection;

          // Keep collections ordered by displayOrder
          state.collections.sort(
            (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
          );
        }
      })

      .addCase(updateCollection.rejected, (state, action) => {
        state.updating = false;

        state.actionError = action.payload || "Failed to update collection";
      })

      // ==================================================
      // DELETE COLLECTION
      // ==================================================

      .addCase(deleteCollection.pending, (state) => {
        state.deleting = true;
        state.actionError = null;
      })

      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.deleting = false;
        state.actionError = null;

        state.collections = state.collections.filter(
          (collection) => collection._id !== action.payload.collectionId,
        );

        if (state.selectedCollection?._id === action.payload.collectionId) {
          state.selectedCollection = null;
        }
      })

      .addCase(deleteCollection.rejected, (state, action) => {
        state.deleting = false;

        state.actionError = action.payload || "Failed to delete collection";
      });
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================

export const { clearSelectedCollection, clearCollectionErrors } =
  adminCollectionSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default adminCollectionSlice.reducer;
