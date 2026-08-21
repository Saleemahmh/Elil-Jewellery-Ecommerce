import {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../services/address.service.js";

// ======================================================
// GET ALL USER ADDRESSES
// ======================================================

export const getAddresses = async (req, res) => {
  try {
    const addresses = await getUserAddresses(req.user.id);

    return res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE ADDRESS
// ======================================================

export const getAddress = async (req, res) => {
  try {
    const address = await getAddressById(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// CREATE ADDRESS
// ======================================================

export const addAddress = async (req, res) => {
  try {
    const address = await createAddress(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE ADDRESS
// ======================================================

export const editAddress = async (req, res) => {
  try {
    const address = await updateAddress(req.params.id, req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE ADDRESS
// ======================================================

export const removeAddress = async (req, res) => {
  try {
    const result = await deleteAddress(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// SET DEFAULT ADDRESS
// ======================================================

export const makeDefaultAddress = async (req, res) => {
  try {
    const address = await setDefaultAddress(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
