import prisma from "../libs/prisma";

class ImageRepository {
  async uploadImage(urlImages: string[], productId: string): Promise<any> {
    const images = urlImages.map((url) => ({ url, productId }));
    console.log(images);
    // return prisma.imageProduct.createMany({ data: [] });
  }
}

export default new ImageRepository();
