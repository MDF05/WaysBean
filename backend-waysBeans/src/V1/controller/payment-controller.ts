import { NextFunction, Request, Response } from "express";
import { paymentDTO } from "./../DTO/payment-DTO";
import successResponse from "../utils/success-response";
import createError from "../utils/create-error";
import paymentService from "../service/payment-service";

class PaymentConroller {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const body: paymentDTO = req.body;

      const token: string = await paymentService.pay(body);

      res.status(200).json(successResponse("token successfully generate", { token }));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }
}

export default new PaymentConroller();
