import Address from "../models/address.js";

// ======================================================
// GET USER ADDRESSES
// ======================================================

export const getUserAddresses = async (userId) => {
  return await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

// ======================================================
// GET SINGLE ADDRESS
// ======================================================

export const getAddressById = async (addressId, userId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  return address;
};

// ======================================================
// CLEAR DEFAULT ADDRESS
// ======================================================

const clearDefaultAddress = async (userId) => {
  await Address.updateMany(
    {
      user: userId,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    },
  );
};

// ======================================================
// CREATE ADDRESS
// ======================================================

export const createAddress = async (userId, addressData) => {
  const {
    label,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = addressData;

  const existingAddressCount = await Address.countDocuments({
    user: userId,
  });

  // First address should automatically become default
  const shouldBeDefault = existingAddressCount === 0 || isDefault === true;

  if (shouldBeDefault) {
    await clearDefaultAddress(userId);
  }

  const address = await Address.create({
    user: userId,
    label,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault: shouldBeDefault,
  });

  return address;
};

// ======================================================
// UPDATE ADDRESS
// ======================================================

export const updateAddress = async (addressId, userId, addressData) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  const {
    label,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = addressData;

  if (isDefault === true) {
    await clearDefaultAddress(userId);
  }

  address.label = label;
  address.fullName = fullName;
  address.phone = phone;
  address.addressLine1 = addressLine1;
  address.addressLine2 = addressLine2 || "";
  address.city = city;
  address.state = state;
  address.postalCode = postalCode;
  address.country = country;
  address.isDefault = isDefault === true;

  return await address.save();
};

// ======================================================
// DELETE ADDRESS
// ======================================================

export const deleteAddress = async (addressId, userId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  const wasDefault = address.isDefault;

  await address.deleteOne();

  // If default address was deleted,
  // make the newest remaining address default.
  if (wasDefault) {
    const nextAddress = await Address.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    if (nextAddress) {
      nextAddress.isDefault = true;
      await nextAddress.save();
    }
  }

  return {
    message: "Address deleted successfully",
  };
};

// ======================================================
// SET DEFAULT ADDRESS
// ======================================================

export const setDefaultAddress = async (addressId, userId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  await clearDefaultAddress(userId);

  address.isDefault = true;

  await address.save();

  return address;
};
