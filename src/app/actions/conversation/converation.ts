// 'use server'
import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const getAllConversation = async ({ userid }: { userid: number }) => {
    //     var user = await prisma.user.findUnique({ where: { phoneNumber: phoneNumber } })
    //     if (user)
    //         return "user alrady exists"
    // console.log('up->password:', password)
    const convs = await prisma.conversation.findMany({
        where: {
            userId: userid
        }
    })
    return convs
}
