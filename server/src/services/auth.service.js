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
