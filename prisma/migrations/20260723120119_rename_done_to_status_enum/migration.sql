/*
  Warnings:

  - You are about to drop the column `done` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'active', 'done');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "done",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'pending';
