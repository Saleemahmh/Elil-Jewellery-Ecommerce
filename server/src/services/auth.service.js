import bcrypt from "bcrypt";
import User from "../models/user.js";

export const createUser = async ({ fullName, email, password }) => {
  // check if existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  return user;
};
export const loginUser = async ({ email, password }) => {
  //check if user  exist
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  //compare passwords

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Email or password");
  }
  return user;
};

// ===============================
// UPDATE PROFILE
// ===============================

export const updateUserProfile = async (userId, profileData) => {
  const { fullName, phone, avatar } = profileData;

  const updateData = {};

  if (fullName !== undefined) {
    updateData.fullName = fullName;
  }

  if (phone !== undefined) {
    updateData.phone = phone;
  }

  if (avatar !== undefined) {
    updateData.avatar = avatar;
  }

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
