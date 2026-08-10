import dns from "node:dns";

// --------------------------------------------------
// MongoDB Atlas DNS workaround
// --------------------------------------------------
// MongoDB Atlas uses mongodb+srv:// which requires
// an SRV DNS lookup.
//
// Your Windows DNS resolver has an issue with the
// Atlas SRV record, so use Cloudflare DNS instead.
//
// IMPORTANT:
// This must run BEFORE mongoose.connect().
// --------------------------------------------------

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Product from "../src/models/product.js";
import { uploadToCloudinary } from "../src/utils/cloudinaryUpload.js";

// --------------------------------------------------
// Resolve __dirname for ES Modules
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------------
// MongoDB
// --------------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI;

// --------------------------------------------------
// Product image directory
// --------------------------------------------------

const imageDirectory = path.resolve(
  __dirname,
  "../../client/src/assets/images/products",
);

// --------------------------------------------------
// Products and their local images
// --------------------------------------------------

const productsToUpdate = [
  {
    slug: "golden-leaf-bracelet",
    image: "pendant_4.jpg",
  },

  {
    slug: "rose-gold-hoop-earrings",
    image: "earrings_4.jpg",
  },

  {
    slug: "twilight-charm-bracelet",
    image: "pendant_2.jpg",
  },
  {
    slug: "sapphire-charm-necklace",
    image: "necklace_4.jpeg",
  },
  {
    slug: "pearl-grace-bracelet",
    image: "bracelet_1.jpg",
  },
];

// --------------------------------------------------
// Upload product images
// --------------------------------------------------

const uploadProductImages = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined. Check your server .env file.",
      );
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB Connected\n");

    // ------------------------------------------------
    // Process each product
    // ------------------------------------------------

    for (const item of productsToUpdate) {
      console.log(`Processing: ${item.slug}`);

      // ----------------------------------------------
      // Find product
      // ----------------------------------------------

      const product = await Product.findOne({
        slug: item.slug,
      });

      if (!product) {
        console.log(`❌ Product not found: ${item.slug}\n`);

        continue;
      }

      // ----------------------------------------------
      // Skip products that already have images
      // ----------------------------------------------

      if (product.images && product.images.length > 0) {
        console.log(`⚠️ ${product.name} already has an image. Skipping.\n`);

        continue;
      }

      // ----------------------------------------------
      // Local image path
      // ----------------------------------------------

      const imagePath = path.join(imageDirectory, item.image);

      if (!fs.existsSync(imagePath)) {
        console.log(`❌ Image not found: ${imagePath}\n`);

        continue;
      }

      console.log(`Uploading: ${item.image}...`);

      // ----------------------------------------------
      // Read image
      // ----------------------------------------------

      const imageBuffer = fs.readFileSync(imagePath);

      // ----------------------------------------------
      // Upload to Cloudinary
      // ----------------------------------------------

      const uploadedImage = await uploadToCloudinary(
        imageBuffer,
        "elil/products",
      );

      console.log("☁️ Cloudinary upload successful");

      // ----------------------------------------------
      // Save Cloudinary data to MongoDB
      // ----------------------------------------------

      product.images = [
        {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        },
      ];

      await product.save();

      console.log(`✅ MongoDB updated: ${product.name}\n`);
    }

    console.log("========================================");

    console.log("🎉 Product image upload completed!");

    console.log("========================================");
  } catch (error) {
    console.error("\n❌ Error uploading product images:");

    console.error(error);
  } finally {
    await mongoose.disconnect();

    console.log("\nMongoDB connection closed.");
  }
};

uploadProductImages();
