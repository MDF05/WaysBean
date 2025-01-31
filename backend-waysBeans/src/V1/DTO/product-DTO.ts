import { ImageUrlTypes } from "../utils/types/image-url-types";

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: string;
  images: ImageUrlTypes[];
  quantity: number;
  countItem: string;
  profileId: string;
}
