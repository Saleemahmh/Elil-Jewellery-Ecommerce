import { generateToken } from "./jwt.js";

const cookieOptions = {
  httpOnly: true,
  //secure: process.env.NODE_ENV === "production",
  secure: true,
  sameSite: "none",
  //sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const sendAuthResponse = (res, user, statusCode, message) => {
  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  const { password, ...userData } = user.toObject();

  return res.status(statusCode).json({
    success: true,
    message,
    user: userData,
  });
};
