-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_private" BOOL NOT NULL DEFAULT false;
ALTER TABLE "categories" ADD COLUMN     "user_id" STRING;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
