import { ProductDTO } from "./product-DTO";

export interface paymentDTO {
  userDetail: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: ProductDTO[];
  totalPrice: number;
}
