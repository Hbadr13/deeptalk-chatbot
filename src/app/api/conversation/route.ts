import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// // creat new conversation
// export async function POST(request: Request) {
//     const data = await request.json();
//     await prisma.conversation.create({
//         data: {
//             userId: data.userId
//         }
//     })
//     const response = NextResponse.json({ hello: 'word' })
//     return response
// }






//
// add message to conversation
export async function POST(request: Request) {
    const body = { hello: '1234' }
    const data = await request.json();
    const convId = data.conversationId
    const message = data.message
    const role = data.role

    const conversation = await prisma.conversation.findUnique({ where: { id: convId } })
    if (!conversation)
        return NextResponse.json({ status: 'field' })

    await prisma.message.create({
        data: {
            convId: convId,
            message: message,
            role: role,
            like: false,
            dislike: false,
            favorite: false,
            register: false
        }
    })
    const response = NextResponse.json({ status: 'succes' })
    return response

}






// // get all conversation
// export async function POST(request: Request) {
//     const body = { hello: '1234' }
//     const data = await request.json();
//     const userId = data.userId
//     const conversations = await prisma.conversation.findMany({ where: { userId: userId } })
//     const response = NextResponse.json(conversations)
//     return response
// }