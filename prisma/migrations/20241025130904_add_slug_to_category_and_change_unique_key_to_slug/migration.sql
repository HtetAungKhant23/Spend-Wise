/*
  Warnings:

  - The values [AYANBANK] on the enum `SUB_ACCOUNT_TYPE` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[user_id,slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "SUB_ACCOUNT_TYPE" ADD VALUE 'AYABANK';
ALTER TYPE "SUB_ACCOUNT_TYPE"DROP VALUE 'AYANBANK';

-- DropIndex
DROP INDEX "categories_user_id_name_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "slug" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_user_id_slug_key" ON "categories"("user_id", "slug");
