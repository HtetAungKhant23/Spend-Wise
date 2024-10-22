/*
  Warnings:

  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id";
ALTER TABLE "transactions" ADD COLUMN     "from_id" STRING;
ALTER TABLE "transactions" ADD COLUMN     "to_id" STRING;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
