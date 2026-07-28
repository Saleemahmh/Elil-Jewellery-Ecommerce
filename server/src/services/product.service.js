import Product from "../models/product.js";

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

export const getAllProducts = async () => {
  return await Product.find().populate("category");
};

//get product id
export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category");
  if (!product) {
    throw new Error("Product not found");
  }
  return getAllProducts;
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
