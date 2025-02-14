/*
  Warnings:

  - Added the required column `authority` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "authority" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "General" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "mainpageimage" TEXT NOT NULL,
    "logoimage" TEXT NOT NULL,
    "contactinfo" TEXT NOT NULL,
    "productcartonloadimage" TEXT NOT NULL,

    CONSTRAINT "General_pkey" PRIMARY KEY ("id")
);
