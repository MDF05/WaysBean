import { Router } from "express";
import paymentController from "../controller/payment-controller";

const PaymentRouter = Router();

PaymentRouter.post("/payment", paymentController.post);

export default PaymentRouter;
