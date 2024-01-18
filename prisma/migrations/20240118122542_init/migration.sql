/*
  Warnings:

  - The primary key for the `Price` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Price" DROP CONSTRAINT "Price_pkey",
ADD CONSTRAINT "Price_pkey" PRIMARY KEY ("product_id", "symbol");
