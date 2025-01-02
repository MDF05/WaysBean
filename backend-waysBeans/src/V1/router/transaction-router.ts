import { Router } from "express";
import authentication from "../middleware/authentication";
import transactionController from "../controller/transaction-controller";

const TransactionRouter = Router();

TransactionRouter.get("/transaction", authentication, transactionController.get);
TransactionRouter.post("/transaction", authentication, transactionController.create);

export default TransactionRouter;
