/*
  Warnings:

  - Made the column `type` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guarantee" ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "serial_number" DROP NOT NULL;
