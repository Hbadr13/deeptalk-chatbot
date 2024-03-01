/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Made the column `userId` on table `Conversation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `convId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_convId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "convId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_convId_fkey" FOREIGN KEY ("convId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
