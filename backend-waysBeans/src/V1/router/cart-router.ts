import { Router } from "express";
import cartController from "../controller/cart-controller";
import authentication from "../middleware/authentication";

const CartRouter = Router();

CartRouter.get("/cart", authentication, cartController.get);
CartRouter.post("/cart/:productId", authentication, cartController.post);
CartRouter.put("/cart/:cartId", authentication, cartController.update);
CartRouter.delete("/cart/many", authentication, cartController.delete);

export default CartRouter;
