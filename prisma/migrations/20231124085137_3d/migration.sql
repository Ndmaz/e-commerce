-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryname_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "categoryname" DROP NOT NULL,
ALTER COLUMN "details" DROP NOT NULL,
ALTER COLUMN "productcode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryname_fkey" FOREIGN KEY ("categoryname") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
