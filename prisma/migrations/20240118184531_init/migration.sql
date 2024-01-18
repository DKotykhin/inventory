/*
  Warnings:

  - You are about to drop the column `id` on the `Price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guarantee" ADD CONSTRAINT "Guarantee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "id";
