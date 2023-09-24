/*
  Warnings:

  - Made the column `locationDescription` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "locationDescription" SET NOT NULL;
