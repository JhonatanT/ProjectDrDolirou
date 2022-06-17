/*
  Warnings:

  - You are about to alter the column `amout` on the `tb_financial` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "tb_financial" ALTER COLUMN "amout" SET DATA TYPE DECIMAL(9,2);
