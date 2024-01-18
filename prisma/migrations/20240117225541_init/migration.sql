/*
  Warnings:

  - You are about to drop the column `isDefault` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Product` table. All the data in the column will be lost.
  - Added the required column `serial_number` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "isDefault",
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isNew",
DROP COLUMN "serialNumber",
ADD COLUMN     "is_new" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "serial_number" TEXT NOT NULL;
