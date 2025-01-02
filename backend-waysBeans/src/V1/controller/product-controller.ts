import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import { ProductDTO } from "../DTO/product-DTO";
import productService from "../service/product-service";
import successResponse from "../utils/success-response";
import cloudinary from "../libs/cloudinary";
import { ImageUrlTypes } from "../utils/types/image-url-types";

class ProductController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const productDTO: ProductDTO = req.body;

      const images: ImageUrlTypes[] | null = await cloudinary.uploader(req.files as any);
      if (images) productDTO.images = images;

      const product = await productService.post(productDTO);

      res.status(201).json(successResponse("Product created successfully", product, 201));
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }

  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getAllProducts();

      res.status(201).json(successResponse("Product get all", product, 201));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }
  async putProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productDTO: ProductDTO = req.body;
      const productId: string = req.params.productId;
      const product = await productService.putProduct(productDTO, +productId);

      res.status(201).json(successResponse("update product  succes", product, 201));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: string = req.params.productId;
      const product = await productService.deleteProduct(+productId);

      res.status(201).json(successResponse("delete product  succes", product, 201));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }
}

export default new ProductController();
