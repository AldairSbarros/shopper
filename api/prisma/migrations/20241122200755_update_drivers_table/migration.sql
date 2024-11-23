/*
  Warnings:

  - You are about to drop the column `KMMinimo` on the `Drivers` table. All the data in the column will be lost.
  - The `Avaliacao` column on the `Drivers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Drivers" DROP COLUMN "KMMinimo",
ADD COLUMN     "KmMinimo" DOUBLE PRECISION,
ALTER COLUMN "Descricao" DROP NOT NULL,
ALTER COLUMN "Carro" DROP NOT NULL,
DROP COLUMN "Avaliacao",
ADD COLUMN     "Avaliacao" DOUBLE PRECISION,
ALTER COLUMN "Taxa" DROP NOT NULL,
ALTER COLUMN "Taxa" SET DATA TYPE DOUBLE PRECISION;
