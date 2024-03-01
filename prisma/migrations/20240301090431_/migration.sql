-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "messages" TEXT[],

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
