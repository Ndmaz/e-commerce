/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `General` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `General` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "General" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "General_name_key" ON "General"("name");
