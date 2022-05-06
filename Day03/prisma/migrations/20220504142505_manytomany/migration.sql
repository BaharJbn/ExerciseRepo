/*
  Warnings:

  - You are about to drop the column `provinceId` on the `City` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "provinceId";

-- CreateTable
CREATE TABLE "_CityToProvince" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CityToProvince_AB_unique" ON "_CityToProvince"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToProvince_B_index" ON "_CityToProvince"("B");

-- AddForeignKey
ALTER TABLE "_CityToProvince" ADD FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToProvince" ADD FOREIGN KEY ("B") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;
