import { Prisma, Transaction } from "@prisma/client";
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
  async create(dto: TransactionDTO[]): Promise<Prisma.BatchPayload> {
    dto.forEach(async (trans) => {
      await prisma.product.update({
        where: {
          id: trans.productId,
        },
        data: {
          quantity: {
            decrement: trans.countItem ?? 1,
          },
        },
      });
    });

    const transaction = await prisma.transaction.createMany({ data: dto });

    return transaction;
  }
}

export default new TrasactionRepository();
