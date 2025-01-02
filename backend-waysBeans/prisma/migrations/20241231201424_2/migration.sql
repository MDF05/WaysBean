/*
  Warnings:

  - You are about to drop the column `paymentType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "paymentType";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "address",
ADD COLUMN     "paymentType" TEXT NOT NULL;
