import Wishlist from "../models/wishlist.js";

// Get wishlist
export const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate("products");

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [],
    });

    wishlist = await Wishlist.findById(wishlist._id).populate("products");
  }

  return wishlist;
};

// Add product
export const addToWishlist = async (userId, productId) => {
  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [],
    });
  }

  const exists = wishlist.products.some((id) => id.toString() === productId);

  if (exists) {
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
      "products",
    );

    return {
      wishlist: populatedWishlist,
      alreadyExists: true,
    };
  }

  wishlist.products.push(productId);

  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
    "products",
  );

  return {
    wishlist: populatedWishlist,
    alreadyExists: false,
  };
};

// Remove product
export const removeFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId,
  );

  await wishlist.save();

  return await Wishlist.findById(wishlist._id).populate("products");
};
