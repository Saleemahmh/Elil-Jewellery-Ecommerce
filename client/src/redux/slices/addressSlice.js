import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAddresses as getAddressesService,
  getAddressById as getAddressByIdService,
  createAddress as createAddressService,
  updateAddress as updateAddressService,
  deleteAddress as deleteAddressService,
  setDefaultAddress as setDefaultAddressService,
} from "../../services/addressService";

// ======================================================
// GET ADDRESSES
// ======================================================

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (_, thunkAPI) => {
    try {
      return await getAddressesService();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

// ======================================================
// GET SINGLE ADDRESS
// ======================================================

export const fetchAddressById = createAsyncThunk(
  "addresses/fetchAddressById",
  async (addressId, thunkAPI) => {
    try {
      return await getAddressByIdService(addressId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch address",
      );
    }
  },
);

// ======================================================
// CREATE ADDRESS
// ======================================================

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (addressData, thunkAPI) => {
    try {
      return await createAddressService(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

// ======================================================
// UPDATE ADDRESS
// ======================================================

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ addressId, addressData }, thunkAPI) => {
    try {
      return await updateAddressService(addressId, addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update address",
      );
    }
  },
);

// ======================================================
// DELETE ADDRESS
// ======================================================

export const removeAddress = createAsyncThunk(
  "addresses/removeAddress",
  async (addressId, thunkAPI) => {
    try {
      await deleteAddressService(addressId);

      return addressId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

// ======================================================
// SET DEFAULT
// ======================================================

export const makeDefaultAddress = createAsyncThunk(
  "addresses/makeDefaultAddress",
  async (addressId, thunkAPI) => {
    try {
      return await setDefaultAddressService(addressId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update default address",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  addresses: [],

  selectedAddress: null,

  loading: false,

  saving: false,

  deleting: false,

  settingDefault: false,

  error: null,

  saveError: null,

  deleteError: null,

  defaultError: null,
};

// ======================================================
// SLICE
// ======================================================

const addressSlice = createSlice({
  name: "addresses",

  initialState,

  reducers: {
    clearAddressError: (state) => {
      state.error = null;
      state.saveError = null;
      state.deleteError = null;
      state.defaultError = null;
    },

    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },

    resetAddresses: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      state.error = null;
      state.saveError = null;
      state.deleteError = null;
      state.defaultError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH ADDRESSES
      // ==================================================

      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.addresses = action.payload.addresses || [];
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch addresses";
      })

      // ==================================================
      // FETCH SINGLE ADDRESS
      // ==================================================

      .addCase(fetchAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.selectedAddress = action.payload.address || null;
      })

      .addCase(fetchAddressById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch address";
      })

      // ==================================================
      // CREATE ADDRESS
      // ==================================================

      .addCase(addAddress.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.saving = false;
        state.saveError = null;

        const newAddress = action.payload.address;

        if (newAddress) {
          // If new address is default,
          // clear previous defaults.
          if (newAddress.isDefault) {
            state.addresses = state.addresses.map((address) => ({
              ...address,
              isDefault: false,
            }));
          }

          state.addresses.unshift(newAddress);
        }
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.saving = false;

        state.saveError = action.payload || "Failed to add address";
      })

      // ==================================================
      // UPDATE ADDRESS
      // ==================================================

      .addCase(editAddress.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })

      .addCase(editAddress.fulfilled, (state, action) => {
        state.saving = false;
        state.saveError = null;

        const updatedAddress = action.payload.address;

        if (updatedAddress) {
          if (updatedAddress.isDefault) {
            state.addresses = state.addresses.map((address) => ({
              ...address,
              isDefault: address._id === updatedAddress._id,
            }));
          } else {
            state.addresses = state.addresses.map((address) =>
              address._id === updatedAddress._id ? updatedAddress : address,
            );
          }
        }
      })

      .addCase(editAddress.rejected, (state, action) => {
        state.saving = false;

        state.saveError = action.payload || "Failed to update address";
      })

      // ==================================================
      // DELETE ADDRESS
      // ==================================================

      .addCase(removeAddress.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })

      .addCase(removeAddress.fulfilled, (state, action) => {
        state.deleting = false;
        state.deleteError = null;

        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload,
        );
      })

      .addCase(removeAddress.rejected, (state, action) => {
        state.deleting = false;

        state.deleteError = action.payload || "Failed to delete address";
      })

      // ==================================================
      // SET DEFAULT
      // ==================================================

      .addCase(makeDefaultAddress.pending, (state) => {
        state.settingDefault = true;
        state.defaultError = null;
      })

      .addCase(makeDefaultAddress.fulfilled, (state, action) => {
        state.settingDefault = false;
        state.defaultError = null;

        const defaultAddress = action.payload.address;

        if (defaultAddress) {
          state.addresses = state.addresses.map((address) => ({
            ...address,
            isDefault: address._id === defaultAddress._id,
          }));
        }
      })

      .addCase(makeDefaultAddress.rejected, (state, action) => {
        state.settingDefault = false;

        state.defaultError =
          action.payload || "Failed to update default address";
      });
  },
});

export const { clearAddressError, clearSelectedAddress, resetAddresses } =
  addressSlice.actions;

export default addressSlice.reducer;
