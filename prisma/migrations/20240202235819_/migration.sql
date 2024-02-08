-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryid_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
