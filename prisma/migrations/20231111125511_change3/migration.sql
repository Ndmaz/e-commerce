/*
  Warnings:

  - You are about to drop the column `code` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `img` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productcode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productname` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "code",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "productcode" TEXT NOT NULL,
ADD COLUMN     "productname" TEXT NOT NULL;
