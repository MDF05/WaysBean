import { v2 as cloudinary } from "cloudinary";
import { ProductDTO } from "../DTO/product-DTO";
import dotenv from "dotenv";
import { ImageUrlTypes } from "../utils/types/image-url-types";
dotenv.config();

//   const product: ProductDTO[] = [];
//   await Promise.all(
//     files.map(async (file) => {
//       const b64 = Buffer.from(file.buffer).toString("base64");
//       const dataURI = "data:" + file.mimetype + ";base64," + b64;
//       const uploadedFile = await cloudinary.uploader.upload(dataURI, {
//         folder: "circle",
//       });
//       product.push({
//         image: uploadedFile.secure_url,
//       });
//     }),
//   );

//   return product;
// };

// export default uploader;

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploader(images: Express.Multer.File[]): Promise<null | ImageUrlTypes[]> {
    try {
      const imageUrl: ImageUrlTypes[] = [];
      await Promise.all(
        images.map(async (file) => {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, { folder: "waysbean" });
          imageUrl.push({ imageUrl: result.secure_url });
        }),
      );
      return imageUrl;
    } catch (err) {
      return null;
    }
  }
  async uploaderSingle(file: Express.Multer.File): Promise<null | string> {
    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: "waysbean" });
      return result.secure_url;
    } catch (err) {
      return null;
    }
  }
}

export default new Cloudinary();
