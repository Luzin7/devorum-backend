-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
