/*
  Warnings:

  - You are about to drop the column `amount` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `balance` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SUB_ACCOUNT_TYPE" AS ENUM ('WALLET', 'KBZPAY', 'AYAPAY', 'WAVEPAY', 'OKDOLLAR', 'KBZBANK', 'AYANBANK', 'CBBANK', 'AGDBANK', 'YOMABANK', 'OTHER');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "amount";
ALTER TABLE "accounts" ADD COLUMN     "balance" INT4 NOT NULL;
ALTER TABLE "accounts" ADD COLUMN     "subType" "SUB_ACCOUNT_TYPE" NOT NULL DEFAULT 'WALLET';
