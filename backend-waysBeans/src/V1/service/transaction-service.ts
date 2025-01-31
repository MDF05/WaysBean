import { Prisma, Transaction } from "@prisma/client";
import profileRepository from "../repository/profile-repository";
import transactionRepository from "../repository/transaction-repository";
import { TransactionDTO } from "../DTO/transaction-dto";

class TransactionService {
  async getTransactionByIdUserLogin(userId: number): Promise<Transaction[]> {
    const transaction = await transactionRepository.getTransactionById(userId);
    if (!transaction) throw new Error("transaction not found");
    return transaction;
  }
  async createTransaction(dto: TransactionDTO[]): Promise<Prisma.BatchPayload> {
    const transaction = await transactionRepository.create(dto);
    return transaction;
  }
}

export default new TransactionService();
