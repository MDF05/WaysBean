import { Cart } from "@prisma/client";
import prisma from "../libs/prisma";

class CartRepository {
  postCartByUserAndProductId(userId: number, productId: number): Promise<Cart> {
    return prisma.cart.create({
      data: {
        userId,
        productId,
      },
      include: {
        User: {
          select: {
            _count: {
              select: {
                cart: true,
              },
            },
          },
        },
      },
    });
  }
  findCartByUserIdAndProductId(userId: number, productId: number): Promise<Cart | null> {
    return prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
      include: {
        User: {
          include: {
            _count: {
              select: {
                cart: true,
              },
            },
          },
        },
      },
    });
  }
  udpateCartByCartId(cartId: number, countItem: number): Promise<Cart> {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        countItem: countItem + 1,
      },
    });
  }

  udpateCartByCartIdPut(cartId: number, countItem: number): Promise<Cart> {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        countItem: countItem,
      },
    });
  }
}

export default new CartRepository();
