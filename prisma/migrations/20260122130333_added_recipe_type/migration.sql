/*
  Warnings:

  - You are about to drop the column `type` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meals"."Recipe" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Meals"."RecipeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RecipeType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_name_key" ON "Meals"."RecipeType"("name");

-- AddForeignKey
ALTER TABLE "Meals"."Recipe" ADD CONSTRAINT "Recipe_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Meals"."RecipeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
