/*
  Warnings:

  - You are about to drop the column `author_name` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `author_name` on the `topics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_name";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "author_name";
