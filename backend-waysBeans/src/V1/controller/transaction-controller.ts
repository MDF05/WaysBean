import { User, Transaction } from "@prisma/client";
import createError from "../utils/create-error";
import { NextFunction, Request, Response } from "express";
import successResponse from "../utils/success-response";
import transactionService from "../service/transaction-service";
import { TransactionDTO } from "../DTO/transaction-dto";

class TransactionController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      const transactions: Transaction[] = await transactionService.getTransactionByIdUserLogin(user.profile.id);
      res.json(successResponse("data received", transactions));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      const body: TransactionDTO = req.body;
      body.profileId = user.profile.id;
      const transactions: Transaction = await transactionService.createTransaction(body);
      res.json(successResponse("data received", transactions));
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }
}

export default new TransactionController();
