import slugify from "slugify";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { deleteFromCloudinary } from "../utils/cloudinaryDelete.js";

import {
  createProduct as createProductService,
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, "elil/products"),
        ),
      );
    }
    const productData = {
      ...req.body,
      images: uploadedImages,
      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
    };

    const product = await createProductService(productData);

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await getAllProductsService(req.query, req.user?._id);

    return res.status(200).json({
      success: true,
      count: result.products.length,
      totalProducts: result.totalProducts,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      products: result.products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let uploadedImages = [];
    const existingProduct = await getProductByIdService(req.params.id);

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      // delete old cloudinary images
      if (existingProduct.images && existingProduct.images.length > 0) {
        await Promise.all(
          existingProduct.images.map((image) =>
            deleteFromCloudinary(image.public_id),
          ),
        );
      }
      uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, "elil/products"),
        ),
      );
    }
    const updateData = {
      ...req.body,
    };

    if (req.body.name) {
      updateData.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }
    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }
    const product = await updateProductService(req.params.id, updateData);
    console.log("req.body:", req.body);
    console.log("updateData:", updateData);
    console.log(product);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //fetch product
    const existingProduct = await getProductByIdService(req.params.id);
    //delete cloudinary images
    if (existingProduct.images && existingProduct.images.length > 0) {
      await Promise.all(
        existingProduct.images.map((image) =>
          deleteFromCloudinary(image.public_id),
        ),
      );
    }

    await deleteProductService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
