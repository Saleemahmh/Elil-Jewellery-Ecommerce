import api from "./axios";

// ======================================================
// GET ADDRESSES
// ======================================================

export const getAddresses = async () => {
  const response = await api.get("/addresses");

  return response.data;
};

// ======================================================
// GET SINGLE ADDRESS
// ======================================================

export const getAddressById = async (addressId) => {
  const response = await api.get(`/addresses/${addressId}`);

  return response.data;
};

// ======================================================
// CREATE ADDRESS
// ======================================================

export const createAddress = async (addressData) => {
  const response = await api.post("/addresses", addressData);

  return response.data;
};

// ======================================================
// UPDATE ADDRESS
// ======================================================

export const updateAddress = async (addressId, addressData) => {
  const response = await api.put(`/addresses/${addressId}`, addressData);

  return response.data;
};

// ======================================================
// DELETE ADDRESS
// ======================================================

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/addresses/${addressId}`);

  return response.data;
};

// ======================================================
// SET DEFAULT ADDRESS
// ======================================================

export const setDefaultAddress = async (addressId) => {
  const response = await api.patch(`/addresses/${addressId}/default`);

  return response.data;
};
