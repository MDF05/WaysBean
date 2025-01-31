export interface CartDTO {
  cart: {
    countItem: number;
    product: {
      images: {
        id: number;
        productId: number;
        imageUrl: string;
      }[];
    } & {
      id: number;
      name: string;
      description: string;
      price: string;
      quantity: number;
      profileId: number | null;
      createdAt: Date;
    };
  }[];
  _count: {};
}
