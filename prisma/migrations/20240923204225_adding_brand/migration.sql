/*
  Warnings:

  - Added the required column `brandid` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandid" INTEGER NOT NULL,
ADD COLUMN     "priceoff" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brandimage" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandid_fkey" FOREIGN KEY ("brandid") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
