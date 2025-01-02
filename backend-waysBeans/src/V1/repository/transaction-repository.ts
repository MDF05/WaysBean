import { Transaction } from "@prisma/client";
import prisma from "../libs/prisma";
import { TransactionDTO } from "./../DTO/transaction-dto";

class TrasactionRepository {
  async getTransactionById(profileId: number): Promise<Transaction[]> {
    const transaction = prisma.transaction.findMany({
      where: {
        profileId,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
        profile: {
          select: {
            userId: true,
          },
        },
      },
    });

    return transaction;
  }
  async create(dto: TransactionDTO): Promise<Transaction> {
    const transaction = prisma.transaction.create({ data: dto });

    return transaction;
  }
}

export default new TrasactionRepository();
