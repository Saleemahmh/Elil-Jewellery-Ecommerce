import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateProfile,
} from "../../services/authService";

// =====================================
// REGISTER
// =====================================

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// =====================================
// LOGIN
// =====================================

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// =====================================
// GET CURRENT USER
// =====================================

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await getCurrentUser();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Not authenticated",
      );
    }
  },
);
// =====================================
// UPDATE PROFILE
// =====================================

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await updateProfile(profileData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update profile",
      );
    }
  },
);

// =====================================
// LOGOUT
// =====================================

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await logoutUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed",
    );
  }
});

// =====================================
// INITIAL STATE
// =====================================

const initialState = {
  user: null,

  isAuthenticated: false,

  loading: false,
  checkingAuth: true,
  error: null,
};

// =====================================
// SLICE
// =====================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================
      // REGISTER
      // =================================

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.checkingAuth = false;

        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // =================================
      // LOGIN
      // =================================

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.checkingAuth = false;

        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthenticated = false;
        state.user = null;
      })

      // =================================
      // CURRENT USER
      // =================================

      .addCase(fetchCurrentUser.pending, (state) => {
        state.checkingAuth = true;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.checkingAuth = false;

        state.user = action.payload.user || null;

        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.checkingAuth = false;

        state.user = null;

        state.isAuthenticated = false;
      })
      // =================================
      // UPDATE PROFILE
      // =================================

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // =================================
      // LOGOUT
      // =================================

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.checkingAuth = false;

        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.checkingAuth = false;

        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
