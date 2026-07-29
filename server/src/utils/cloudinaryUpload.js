import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folder = "elil/products") => {
  return new Promise((resolve, reject) => {
    console.log(cloudinary.config());
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      },
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};
