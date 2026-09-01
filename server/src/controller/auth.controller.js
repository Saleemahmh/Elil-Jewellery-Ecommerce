import {
  createUser,
  loginUser,
  updateUserProfile,
} from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { sendAuthResponse } from "../utils/authResponse.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await createUser({
      fullName,
      email,
      password,
    });
    sendAuthResponse(res, user, 201, "User registered successfully");
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({
      email,
      password,
    });

    sendAuthResponse(res, user, 200, "Login successfully");
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export const getCurrentUser = async (req, res) => {
  const { password, ...userData } = req.user.toObject();

  res.status(200).json({
    success: true,
    user: userData,
  });
};
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    // secure: true,
    // sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// =====================================
// UPDATE PROFILE
// =====================================

export const updateProfile = async (req, res) => {
  try {
    const user = await updateUserProfile(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
