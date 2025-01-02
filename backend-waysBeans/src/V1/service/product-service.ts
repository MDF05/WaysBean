import { Product } from "@prisma/client";
import { ProductDTO } from "../DTO/product-DTO";
import productRepository from "../repository/product-repository";

class ProductService {
  async post(productDTO: ProductDTO): Promise<Product> {
    return await productRepository.post(productDTO);
  }

  async getAllProducts(): Promise<Product[]> {
    return await productRepository.getAllProducts();
  }

  async putProduct(productDTO: ProductDTO, productId: number): Promise<Product> {
    return await productRepository.update(productDTO, productId);
  }

  async deleteProduct(productId: number): Promise<Product> {
    return await productRepository.delete(productId);
  }
}

export default new ProductService();
