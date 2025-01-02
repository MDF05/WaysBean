import { ImageUrlTypes } from "../utils/types/image-url-types";

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: string;
  images: ImageUrlTypes[];
  quantity: string;
  countItem: string;
  profileId: string;
}
