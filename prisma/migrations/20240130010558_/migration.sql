/*
  Warnings:

  - You are about to drop the column `categoryname` on the `Product` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[productname]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryid` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryname_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryname",
ADD COLUMN     "categoryid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Product_productname_key" ON "Product"("productname");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
