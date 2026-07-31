import {
  getWishlist as getWishlistService,
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
} from "../services/wishlist.service.js";

// Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await getWishlistService(req.user.id);

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Product to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { wishlist, alreadyExists } = await addToWishlistService(
      req.user.id,
      req.body.productId,
    );

    return res.status(200).json({
      success: true,
      message: alreadyExists
        ? "Product is already wishlisted"
        : "Product added to wishlist",
      wishlist,
      wishlist,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await removeFromWishlistService(
      req.user.id,
      req.params.productId,
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
