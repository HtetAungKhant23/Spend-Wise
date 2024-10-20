/*
  Warnings:

  - A unique constraint covering the columns `[user_id,subType]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "accounts_user_id_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_id_subType_key" ON "accounts"("user_id", "subType");
