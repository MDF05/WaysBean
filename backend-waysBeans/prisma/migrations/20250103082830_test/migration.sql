/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `fraud_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gross_amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_code` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_message` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_time` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_transactionId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionId",
ADD COLUMN     "fraud_status" TEXT NOT NULL,
ADD COLUMN     "gross_amount" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL,
ADD COLUMN     "status_code" TEXT NOT NULL,
ADD COLUMN     "status_message" TEXT NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL,
ADD COLUMN     "transaction_status" TEXT NOT NULL,
ADD COLUMN     "transaction_time" TEXT NOT NULL,
ALTER COLUMN "countItem" DROP NOT NULL;
