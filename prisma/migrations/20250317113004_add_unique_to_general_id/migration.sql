/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `General` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "General_id_key" ON "General"("id");
