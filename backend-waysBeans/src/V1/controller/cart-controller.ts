import { NextFunction, Request, Response } from "express";
import successResponse from "../utils/success-response";
import createError from "../utils/create-error";
import cartService from "../service/cart-service";
import { Cart } from "@prisma/client";
import { CartDTO } from "../DTO/cart-DTO";

class CartController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = res.locals.user.id;
      const cart: CartDTO = await cartService.getCartByUserId(+userId);

      res.status(200).json(successResponse("get cart successfully", cart, 200));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 402));
      else next(createError("internal server error", 505));
    }
  }
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = res.locals.user.id;
      const productId: string = req.params.productId;

      const cart = await cartService.postCartByUserAndProductId(+userId, +productId);
      res.status(200).json(successResponse("save cart successfully", cart, 200));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 402));
      else next(createError("internal server error", 505));
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId: string = req.params.cartId;
      const countItem: string = `${req.query.countItem ?? 0}`;

      const cart = await cartService.updateCartByCartId(+cartId, +countItem);
      res.status(200).json(successResponse("update cart successfully", cart, 200));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 402));
      else next(createError("internal server error", 505));
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = res.locals.user.id;
      const idquery: string = `${req.query.productId}`;
      const productId: number[] = idquery.split(",").map((id) => +id);

      const cart = await cartService.deleteManyByUserIdAndProductId(+userId, productId);
      res.status(200).json(successResponse("delete cart successfully", cart, 200));
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) next(createError(err.message, 402));
      else next(createError("internal server error", 505));
    }
  }
}

export default new CartController();
