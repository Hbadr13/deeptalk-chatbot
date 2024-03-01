import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

// creat new conversation
export async function POST(request: Request) {
    const data = await request.json();
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })

    await prisma.conversation.create({
        data: {
            userId: data.userId,
            name: data.name
        }
    })
    const response = NextResponse.json({ hello: 'word' })
    return response
}




// export async function POST(request: Request) {

//     // const id = ctx.params.id
//     const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
//     if (!payload)
//         return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })

//     const body = { hello: '1234' }
//     const data = await request.json();
//     const convId = data.conversationId
//     const message = data.message
//     const role = data.role

//     const conversation = await prisma.conversation.findUnique({ where: { id: convId } })
//     if (!conversation)
//         return NextResponse.json({ status: 'field' })

//     await prisma.message.create({
//         data: {
//             convId: convId,
//             message: message,
//             role: role,
//             like: false,
//             dislike: false,
//             favorite: false,
//             register: false
//         }
//     })
//     const response = NextResponse.json({ status: 'succes' })
//     return response

// }


export async function GET(request: Request) {
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
    const userid = (payload as JwtPayload).id;

    console.log(payload)
    const conversation = await prisma.conversation.findMany({
        where: {
            userId: userid
        }
    })
    return new Response(JSON.stringify(conversation), { status: 200 })
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
    const userid = (payload as JwtPayload).id;

    console.log('b----->ody', body.conversationId)

    await prisma.message.deleteMany({
        where: {
            convId: body.conversationId,
        }
    })

    const conversation = await prisma.conversation.findUnique({
        where: {
            id: body.conversationId,
        }
    })
    if (!conversation)
        return new Response(JSON.stringify('no conversation found'), { status: 200 })
    await prisma.conversation.delete({
        where: {
            id: body.conversationId,
        }
    })
    return new Response(JSON.stringify('succes'), { status: 200 })
}
