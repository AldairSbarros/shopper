/*
  Warnings:

  - Added the required column `Photo` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" ADD COLUMN     "Photo" TEXT NOT NULL;
