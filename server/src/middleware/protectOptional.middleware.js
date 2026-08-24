import { verifyToken } from "../utils/jwt.js";
import User from "../models/user.js";

const protectOptional = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next();
    }
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
export default protectOptional;
