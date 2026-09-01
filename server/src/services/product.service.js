import mongoose from "mongoose";
import Product from "../models/product.js";
import Wishlist from "../models/wishlist.js";
import Collection from "../models/collections.js";

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
    collection,
    featured,
    bestSeller,
    newArrival,
    minPrice,
    maxPrice,
    availability,
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
  //collection
  // ======================================================
  // COLLECTION
  // ======================================================

  if (collection) {
    const collectionDoc = mongoose.Types.ObjectId.isValid(collection)
      ? await Collection.findById(collection)
      : await Collection.findOne({ slug: collection });

    if (collectionDoc) {
      filter.collections = collectionDoc._id;
    } else {
      filter.collections = null;
    }
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

  //in stock

  if (availability === "in-stock") {
    filter.stock = { $gt: 0 };
  }

  if (availability === "out-of-stock") {
    filter.stock = { $lte: 0 };
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
    .populate("collections")
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
  const product = await Product.findById(id)
    .populate("category")
    .populate("collections");
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
// get product by slug
export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("collections");

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
