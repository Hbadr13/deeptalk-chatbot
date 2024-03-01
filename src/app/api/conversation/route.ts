import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//creat new conversation
// export async function POST(request: Request) {
//     const body = { hello: '1234' }
//     const data = await request.json();
//     data.userId
//     await prisma.conversation.create({
//         data: {
//             userId: data.userId
//         }
//     })
//     console.log('body->', data)
//     const response = NextResponse.json({ hello: 'word' })
//     return response

// }
// // add message to conversation
// export async function POST(request: Request) {
//     const body = { hello: '1234' }
//     const data = await request.json();
//     const convId = data.conversationId
//     const message = data.message
//     const conversation = await prisma.conversation.findUnique({ where: { id: convId } })
//     await prisma.conversation.update({
//         where: {
//             id: data.conversationId
//         },
//         data: {
//             messages: {
//                 push: message
//             }
//         }
//     })
//     const response = NextResponse.json({ status: 'succes' })
//     return response

// }
// add message to conversation
export async function POST(request: Request) {
    const body = { hello: '1234' }
    const data = await request.json();
    const userId = data.userId
    const conversations = await prisma.conversation.findMany({ where: { userId: userId } })
    conversations[0]
    const response = NextResponse.json(conversations)
    return response
}