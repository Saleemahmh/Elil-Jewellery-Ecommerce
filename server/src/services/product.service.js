import Product from "../models/product.js";
import Wishlist from "../models/wishlist.js";

export const createProduct = async (productData) => {
  const existingProduct = await Product.findOne({
    slug: productData.slug,
  });
  if (existingProduct) {
    throw new Error("Product already exists");
  }
  const product = await Product.create(productData);
  return product;
};
//get all products

export const getAllProducts = async (queryParams, userId = null) => {
  //search and filter
  const {
    search,
    category,
    featured,
    bestSeller,
    newArrival,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
  } = queryParams;
  const skip = (Number(page) - 1) * Number(limit);
  const filter = {};
  //search
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }
  //category

  if (category) {
    filter.category = category;
  }
  //featured

  if (featured !== undefined) {
    filter.featured = featured === "true";
  }
  //best seller
  if (bestSeller !== undefined) {
    filter.bestSeller = bestSeller === "true";
  }
  //new arrival

  if (newArrival !== undefined) {
    filter.newArrival = newArrival === "true";
  }

  //price filter

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }
  let sortOption = { createdAt: -1 }; // Default: newest first

  switch (sort) {
    case "oldest":
      sortOption = { createdAt: 1 };
      break;

    case "price-asc":
      sortOption = { price: 1 };
      break;

    case "price-desc":
      sortOption = { price: -1 };
      break;

    case "name-asc":
      sortOption = { name: 1 };
      break;

    case "name-desc":
      sortOption = { name: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }
  const totalProducts = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("category")
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));
  let wishlistIds = [];
  if (userId) {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlistIds = wishlist.products.map((id) => id.toString());
    }
  }
  const updatedProducts = products.map((product) => ({
    ...product.toObject(),
    isWishlisted: wishlistIds.includes(product._id.toString()),
  }));
  return {
    products: updatedProducts,
    totalProducts,
    currentPage: Number(page),
    totalPages: Math.ceil(totalProducts / Number(limit)),
  };
};

//get product id
export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category");
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

//update product

export const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

//delete product

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error("product not found");
  }
  return product;
};
