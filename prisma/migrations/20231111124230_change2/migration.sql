/*
  Warnings:

  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL;
