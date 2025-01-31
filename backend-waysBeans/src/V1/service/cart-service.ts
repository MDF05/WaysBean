import { Cart, Prisma, PrismaPromise } from "@prisma/client";
import { CartDTO } from "../DTO/cart-DTO";
import cartRepository from "../repository/cart-repository";
import userRepository from "../repository/user-repository";

class CartService {
  async getCartByUserId(userId: number): Promise<CartDTO> {
    const cart: CartDTO = await userRepository.findCartByUserId(userId);
    return cart;
  }

  async postCartByUserAndProductId(userId: number, productId: number): Promise<Cart> {
    const findCart: Cart | null = await cartRepository.findCartByUserIdAndProductId(userId, productId);

    if (findCart) {
      const update = await cartRepository.udpateCartByCartId(findCart.id, findCart.countItem);
      if (!update) throw new Error("faild to update cart");
      return { ...update };
    }

    const cart: Cart = await cartRepository.postCartByUserAndProductId(userId, productId);
    return cart;
  }

  async updateCartByCartId(cartId: number, countItem: number): Promise<Cart> {
    const update = await cartRepository.udpateCartByCartIdPut(cartId, countItem);
    return update;
  }
  async deleteManyByUserIdAndProductId(userId: number, productId: number[]): Promise<Prisma.BatchPayload> {
    const update = await cartRepository.deleteManyByUserIdAndProductId(userId, productId);
    return update;
  }
}

export default new CartService();
